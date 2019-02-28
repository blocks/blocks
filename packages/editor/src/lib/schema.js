import { Block } from 'slate'

export default {
  document: {
    last: { type: 'paragraph' },
    normalize: (change, { code, node, child }) => {
      switch (code) {
        case 'last_child_type_invalid': {
          const paragraph = Block.create('paragraph')
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
      }
    }
  },

  blocks: {
    image: {
      isVoid: true
    },
    hr: {
      isVoid: true
    },
    unfurl: {
      isVoid: true
    }
  }
}
