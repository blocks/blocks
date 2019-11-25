import visit from 'unist-util-visit'

import { isOpenTag, isCloseTag } from './util'

export default () => ast => {
  visit(ast, 'jsx', (node, index, parent) => {
    if (!isCloseTag(node.value)) {
      return
    }

    for (let i = index - 1; i >= 0; i--) {
      // This should eventually check to also make sure that the JSX blocks
      // wrapping Markdown have matching tag names as well.
      if (isOpenTag(parent.children[i].value)) {
        const open = parent.children[i]
        open.children = [{ type: 'jsx', value: open.value }]

        for (let j = i + 1; j <= index; j++) {
          const child = parent.children[j]
          open.children.push(child)
        }

        parent.children.splice(i + 1, index - 1)
        delete open.value
      }
    }
  })

  return ast
}
