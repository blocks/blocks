import { Block } from 'slate'

export default {
  document: {
    last: { type: 'paragraph' },
    normalize: (change, { code, node }) => {
      switch (code) {
        case 'last_child_type_invalid': {
          const paragraph = Block.create('paragraph')
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
        default: {
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
    'jsx-void': {
      isVoid: true
    }
  }
}
