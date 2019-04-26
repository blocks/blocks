const hasBlock = (editor, type) => {
  return editor.value.blocks.some(node => node.type === type)
}

// Certain nodes like list-items and block-quotes have an inner
// paragraph so we need to query the parent node rather than
// the start block
const hasOuterBlock = (editor, type) => {
  const { value } = editor
  const { startBlock, document } = value

  if (!startBlock) {
    return false
  }

  const outerBlock = document.getParent(startBlock.key)

  // Lists are somewhat special and have an additional child element.
  // So, if we detect a list we reach out to one more time to the parent
  // which will point to the actual wrapping list node.
  if (outerBlock.type === 'list-item') {
    const listBlock = document.getParent(outerBlock.key)
    return listBlock && listBlock.type === type
  } else {
    return outerBlock && outerBlock.type === type
  }
}

export default {
  hasBlock,
  hasOuterBlock
}
