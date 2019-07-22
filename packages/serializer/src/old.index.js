import unified from 'unified'
import mdx from 'remark-mdx'
import parse from 'remark-parse'
import stringify from 'remark-stringify'
import squeezeParagraphs from 'remark-squeeze-paragraphs'
import { Data } from 'slate'

import interleave from './remark-interleave'
import { getComponentName, toJS } from './util'
import { parseJSXBlock, applyProps } from './parse-jsx'

const parser = unified()
  .use(parse, {
    commonmark: true,
    position: false
  })
  .use(squeezeParagraphs)
  .use(interleave)
  .use(mdx)

export const parseMDX = md => parser.runSync(parser.parse(md))

const stringifier = unified()
  .use(stringify, {
    bullet: '*',
    fences: true
  })
  .use(squeezeParagraphs)
  .use(mdx)

export const stringifyMDX = mdxast =>
  stringifier.stringify(stringifier.runSync(mdxast))

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

const isJSX = node => {
  if (node.object !== 'block') return false
  return node.type === 'jsx' || node.type === 'jsx-void'
}

const jsxBlock = {
  match: isJSX,
  matchMdast: (node, index, parent) =>
    node.type === 'jsx' && parent && parent.type === 'root',
  fromMdast: (node, index, parent, { visitChildren }) => {
    let data = {}
    if (node.children) {
      data = {
        type: getComponentName(node.children[0].value),
        props: {}
      }

      // Remove open and closing jsx blocks
      node.children = node.children.slice(1, node.children.length - 1)

      return {
        object: 'block',
        type: 'jsx',
        nodes: visitChildren(node),
        data: {
          type: data.type,
          props: Data.create(data.props)
        }
      }
    } else {
      data = parseJSXBlock(node.value)
      return {
        object: 'block',
        type: 'jsx-void',
        data: {
          type: data.type,
          props: Data.create(data.props)
        }
      }
    }
  },
  toMdast: (object, index, parent, { visitChildren }) => {
    const props = toJS(object.data.props)

    if (!object.data.type) {
      return {
        type: 'jsx',
        value: visitChildren(object)[0].value
      }
    }

    const value = applyProps(`<${object.data.type} />`, { props })

    if (object.type === 'jsx-void') {
      return {
        type: 'jsx',
        value
      }
    }

    const children = visitChildren(object)
    return [
      {
        type: 'jsx',
        value: value.replace(/ \/>$/, '>')
      },
      ...children,
      {
        type: 'jsx',
        value: `</${object.data.type}>`
      }
    ]
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
    //    br,
    bold,
    //    code,
    italic,
    jsxMark,
    blockQuote,
    jsxBlock,
    //    codeBlock,
    image,
    link,
    bulletedList,
    numberedList,
    listItem
  ].concat(headings)
})
