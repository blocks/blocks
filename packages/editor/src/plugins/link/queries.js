const hasLinks = editor => {
  return editor.value.inlines.some(inline => inline.type === 'link')
}
const hasMultipleBlocks = editor => editor.value.blocks.size > 1

export default {
  hasLinks,
  hasMultipleBlocks
}
