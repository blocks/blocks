const hasBlock = (editor, type) => {
  return editor.value.blocks.some(node => node.type === type)
}

export default {
  hasBlock
}
