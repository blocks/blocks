const MarkdownSerializer = require('slate-mdast-serializer')
const unified = require('unified')
const remarkStringify = require('remark-stringify')
const remarkParse = require('remark-parse')
const mdx = require('remark-mdx')

const parser = unified()
  .use(remarkParse, {
    commonmark: true,
    position: false
  })
  .use(mdx)

export const parseMDX = md => parser.runSync(parser.parse(md))

const stringifier = unified()
  .use(remarkStringify, {
    bullet: '*',
    fences: true
  })
  .use(mdx)

export const stringifyMDX = mdast =>
  stringifier.stringify(stringifier.runSync(mdast))

const paragraph = {
  match: node => node.object === 'block' && node.type === 'paragraph',
  matchMdast: node => node.type === 'paragraph',
  fromMdast: (node, index, parent, { visitChildren }) => ({
    object: 'block',
    type: 'paragraph',
    nodes: visitChildren(node)
  }),
  toMdast: (object, index, parent, { visitChildren }) => ({
    type: 'paragraph',
    children: visitChildren(object)
  })
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
  toMdast: (mark, index, parent, { visitChildren }) => ({
    type: 'strong',
    children: visitChildren(mark)
  })
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
        .join('\n\n')
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

const jsxBlock = {
  match: node => node.type === 'jsx' && node.object === 'block',
  matchMdast: (node, index, parent) =>
    node.type === 'jsx' && parent && parent.type === 'root',
  fromMdast: (node, index, parent, { visitChildren }) => {
    return {
      object: 'block',
      type: 'jsx',
      nodes: [
        {
          object: 'text',
          leaves: [
            {
              text: node.value
            }
          ]
        }
      ]
    }
  },
  toMdast: (mark, index, parent, { visitChildren }) => {
    return {
      type: 'jsx',
      value: mark.nodes.map(node => node.leaves[0].text).join()
    }
  }
}

export const serializer = new MarkdownSerializer({
  rules: [
    paragraph,
    bold,
    code,
    italic,
    jsxMark,
    blockQuote,
    jsxBlock,
    codeBlock
  ].concat(headings)
})
