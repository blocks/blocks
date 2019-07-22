import flatten from 'lodash.flatten'
import phrasing from 'mdast-util-phrasing'

import { getComponentName } from './util'

const toSlate = node => {
  if (node.type === 'text') {
    return {
      object: 'text',
      text: node.value
    }
  }

  if (node.type === 'heading') {
    return {
      object: 'block',
      type: 'heading-' + node.depth,
      nodes: flatten(node.children.map(toSlate))
    }
  }

  // This is an interleaved JSX block which means an open
  // tag followed by a blank line and then markdown.
  if (node.type === 'jsx' && node.children) {
    // Remove open and closing jsx blocks
    const children = node.children.slice(1, node.children.length - 1)

    return {
      object: 'block',
      type: 'jsx',
      nodes: flatten(children.map(toSlate)),
      data: {
        type: getComponentName(node.children[0].value),
        props: {}
      }
    }
  }

  if (phrasing(node)) {
    const parentMark = {
      object: 'mark',
      type: node.type
    }

    const nodes = node.children.map(child => {
      const childMark = child.type !== 'text' && {
        object: 'mark',
        type: child.type
      }

      return {
        object: 'text',
        text: child.value,
        marks: [parentMark, childMark].filter(Boolean)
      }
    })

    return nodes
  }

  return {
    object: 'block',
    type: node.type,
    nodes: node.children.map(toSlate)
  }
}

export default function remarkSlate() {
  this.Compiler = compiler

  function compiler(node) {
    if (node.type === 'root') {
      console.log(node.children)
      return {
        object: 'value',
        document: {
          object: 'document',
          data: {},
          nodes: node.children.map(toSlate)
        }
      }
    }

    return toSlate(node)
  }
}
