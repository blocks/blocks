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

  return outerBlock && outerBlock.type === type
}

export default {
  hasBlock,
  hasOuterBlock
}
