const MarkdownSerializer = require('slate-mdast-serializer')
const unified = require('unified')
const remarkStringify = require('remark-stringify')
const remarkParse = require('remark-parse')
const remarkSqueezeParagraphs = require('remark-squeeze-paragraphs')
const mdx = require('remark-mdx')
const { Data } = require('slate')

const { parseJSXBlock, applyProps } = require('./parse-jsx')
const remarkInterleave = require('./remark-interleave').default

const parser = unified()
  .use(remarkParse, {
    commonmark: true,
    position: false
  })
  .use(remarkSqueezeParagraphs)
  .use(remarkInterleave)
  .use(() => ast => console.log(ast) || ast)
  .use(mdx)

export const parseMDX = md => parser.runSync(parser.parse(md))

const stringifier = unified()
  .use(remarkStringify, {
    bullet: '*',
    fences: true
  })
  .use(remarkSqueezeParagraphs)
  .use(_ => ast => console.log(JSON.stringify(ast, null, 2)) || ast)
  .use(mdx)

export const stringifyMDX = mdast =>
  stringifier.stringify(stringifier.runSync(mdast))

const paragraph = {
  match: node => node.object === 'block' && node.type === 'paragraph',
  matchMdast: node => node.type === 'paragraph',
  fromMdast: (node, _index, parent, { visitChildren }) => {
    return {
      object: 'block',
      type: 'paragraph',
      nodes: visitChildren(node)
    }
  },
  toMdast: (object, _index, parent, { visitChildren }) => {
    return {
      type: 'paragraph',
      children: visitChildren(object)
    }
  }
}

const br = {
  match: node => node.type === 'break',
  matchMdast: node => node.type === 'break',
  fromMdast: (node, _index, _parent, { visitChildren }) => {
    return {
      object: 'text',
      leaves: [
        {
          object: 'leaf',
          text: '\n'
        }
      ]
    }
  }
}

const image = {
  match: node => node.object === 'block' && node.type === 'image',
  matchMdast: node => node.type === 'image',
  fromMdast: node => {
    return {
      object: 'block',
      type: 'image',
      isVoid: true,
      data: {
        alt: node.alt,
        src: node.url
      },
      nodes: []
    }
  },
  toMdast: object => {
    return {
      type: 'image',
      alt: object.data.alt,
      url: object.data.src
    }
  }
}

const blockQuote = {
  match: node => node.object === 'block' && node.type === 'block-quote',
  matchMdast: node => node.type === 'blockquote',
  fromMdast: (node, index, parent, { visitChildren }) => ({
    object: 'block',
    type: 'block-quote',
    nodes: visitChildren(node)
  }),
  toMdast: (object, index, parent, { visitChildren }) => ({
    type: 'blockquote',
    children: visitChildren(object)
  })
}

const bulletedList = {
  match: node => node.object === 'block' && node.type === 'bulleted-list',
  matchMdast: node => node.type === 'list' && !node.ordered,
  fromMdast: (node, _index, _parent, { visitChildren }) => ({
    object: 'block',
    type: 'bulleted-list',
    nodes: visitChildren(node)
  }),
  toMdast: (object, _index, _parent, { visitChildren }) => {
    return {
      type: 'list',
      ordered: false,
      children: visitChildren(object)
    }
  }
}

const numberedList = {
  match: node => node.object === 'block' && node.type === 'numbered-list',
  matchMdast: node => node.type === 'list' && node.ordered,
  fromMdast: (node, _index, _parent, { visitChildren }) => ({
    object: 'block',
    type: 'numbered-list',
    nodes: visitChildren(node)
  }),
  toMdast: (object, _index, _parent, { visitChildren }) => {
    return {
      type: 'list',
      ordered: true,
      children: visitChildren(object)
    }
  }
}

const listItem = {
  match: node => node.object === 'block' && node.type === 'list-item',
  matchMdast: node => node.type === 'listItem',
  fromMdast: (node, index, parent, { visitChildren }) => {
    return {
      object: 'block',
      type: 'list-item',
      nodes: visitChildren(node)
    }
  },
  toMdast: (object, _index, _parent, { visitChildren }) => {
    return {
      type: 'listItem',
      children: visitChildren(object)
    }
  }
}

const listItemChild = {
  match: node => node.object === 'block' && node.type === 'list-item-child',
  matchMdast: (node, _index, parent) =>
    node.type === 'paragraph' && parent.type === 'listItem',
  fromMdast: (node, index, parent, { visitChildren }) => {
    return {
      object: 'block',
      type: 'list-item-child',
      nodes: visitChildren(node)
    }
  },
  toMdast: (object, _index, parent, { visitChildren }) => {
    return {
      type: 'paragraph',
      children: visitChildren(object)
    }
  }
}

const headings = [
  'heading-one',
  'heading-two',
  'heading-three',
  'heading-five',
  'heading-six'
]
  .map((nodeType, headingOffset) => {
    return {
      match: node => node.object === 'block' && node.type === nodeType,
      matchMdast: node =>
        node.type === 'heading' && node.depth === headingOffset + 1,
      fromMdast: (node, index, parent, { visitChildren }) => ({
        object: 'block',
        type: nodeType,
        nodes: visitChildren(node)
      }),
      toMdast: (object, index, parent, { visitChildren }) => ({
        type: 'heading',
        depth: headingOffset + 1,
        children: visitChildren(object)
      })
    }
  })
  .reverse()

const bold = {
  match: node => node.object === 'mark' && node.type === 'bold',
  matchMdast: node => node.type === 'strong',
  fromMdast: (node, index, parent, { visitChildren }) => {
    return {
      object: 'mark',
      type: 'bold',
      nodes: visitChildren(node)
    }
  },
  toMdast: (mark, index, parent, { visitChildren }) => {
    return {
      type: 'strong',
      children: visitChildren(mark)
    }
  }
}

const codeBlock = {
  match: node => node.object === 'block' && node.type === 'pre',
  matchMdast: node => node.type === 'code',
  fromMdast: (node, _index, _parent, { visitChildren }) => {
    return {
      object: 'block',
      type: 'pre',
      nodes: [
        {
          object: 'text',
          leaves: [
            {
              object: 'leaf',
              text: node.value
            }
          ]
        }
      ]
    }
  },
  toMdast: (node, _index, _parent, { visitChildren }) => {
    return {
      type: 'code',
      value: visitChildren(node)
        .map(childNode => childNode.value)
        .filter(Boolean)
        .join('\n')
    }
  }
}

const code = {
  match: node => node.object === 'mark' && node.type === 'code',
  matchMdast: node => node.type === 'inlineCode',
  fromMdast: (node, index, parent, { visitChildren }) => {
    return {
      object: 'mark',
      type: 'code',
      nodes: [
        {
          object: 'text',
          leaves: [
            {
              marks: [],
              object: 'leaf',
              text: node.value
            }
          ]
        }
      ]
    }
  },
  toMdast: (mark, index, parent, { visitChildren }) => {
    return {
      type: 'inlineCode',
      value: visitChildren(mark)
        .map(childNode => childNode.value)
        .join('')
    }
  }
}

const italic = {
  match: node => node.object === 'mark' && node.type === 'italic',
  matchMdast: node => node.type === 'emphasis',
  fromMdast: (node, index, parent, { visitChildren }) => ({
    object: 'mark',
    type: 'italic',
    nodes: visitChildren(node)
  }),
  toMdast: (mark, index, parent, { visitChildren }) => ({
    type: 'emphasis',
    children: visitChildren(mark)
  })
}

// Inline doesn't currently work correctly
// What happens is:
// Given input like this:
//  plain text in a paragraph <span>jsx children</span>.
// it thinks that <span> is a jsx node and </span> is a jsx node, but jsx children is not
// Currently, this editor doesn't seem to support inline JSX though.
// rendering this doesn't break anything, it just doesn't really do anything special.
const jsxMark = {
  match: node => {
    return node.type === 'jsx' && node.object === 'mark'
  },
  matchMdast: (node, index, parent) => {
    return node.type === 'jsx' && (!parent || parent.type !== 'root')
  },
  fromMdast: (node, index, parent, { visitChildren, context }) => {
    return {
      object: 'mark',
      type: 'jsx',
      text: node.value,
      nodes: []
    }
  },
  toMdast: (mark, index, parent, { visitChildren }) => {
    return {
      type: 'jsx',
      value: visitChildren(mark)
        .map(childNode => childNode.value)
        .join()
    }
  }
}

const jsxBlockTypes = {
  youtube: '<YouTube />'
}
const isJSX = node => {
  if (node.object !== 'block') return false
  if (node.type === 'jsx') return true
  return !!jsxBlockTypes[node.type]
}

const jsxBlock = {
  match: isJSX,
  matchMdast: (node, index, parent) =>
    node.type === 'jsx' && parent && parent.type === 'root',
  fromMdast: (node, index, parent, { visitChildren }) => {
    const data = parseJSXBlock(node.value)
    switch (data.type) {
      case 'YouTube':
        return {
          object: 'block',
          type: 'youtube',
          data: {
            type: data.type,
            props: Data.create(data.props || {})
          }
        }
      default:
        return {
          object: 'block',
          type: 'jsx',
          data: {
            type: data.type,
            props: data.props
          },
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  object: 'leaf',
                  text: node.value,
                  marks: []
                }
              ]
            }
          ]
        }
    }
  },
  toMdast: (object, index, parent, { visitChildren }) => {
    let value = object.nodes.map(node => node.leaves[0].text).join()
    if (jsxBlockTypes[object.type]) {
      // only update blessed types
      value = jsxBlockTypes[object.type]
      const props = object.data.props.toJS()
      value = applyProps(value, { props })
    }
    return {
      type: 'jsx',
      value
    }
  }
}

const link = {
  match: node => node.object === 'inline' && node.type === 'link',
  matchMdast: node => node.type === 'link',
  fromMdast: (node, index, parent, { visitChildren }) => {
    return {
      object: 'inline',
      type: 'link',
      data: {
        href: node.url,
        title: node.title,
        target: node.target
      },
      nodes: visitChildren(node)
    }
  },
  toMdast: (mark, index, parent, { visitChildren }) => ({
    type: 'link',
    url: mark.data.href,
    title: mark.data.title,
    target: mark.data.target,
    children: visitChildren(mark)
  })
}

export const serializer = new MarkdownSerializer({
  rules: [
    listItemChild, // We want this to run before paragraph because it's a special case
    paragraph,
    br,
    bold,
    code,
    italic,
    jsxMark,
    blockQuote,
    jsxBlock,
    codeBlock,
    image,
    link,
    bulletedList,
    numberedList,
    listItem
  ].concat(headings)
})
