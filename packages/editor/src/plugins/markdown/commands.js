const DEFAULT_BLOCK = 'paragraph'

const toggleBold = editor => {
  editor.toggleMark('bold').focus()
}

const toggleItalic = editor => {
  editor.toggleMark('italic').focus()
}

const toggleBlock = (editor, type) => {
  if (editor.hasBlock(type)) {
    editor.setBlocks(DEFAULT_BLOCK)
  } else {
    editor.setBlocks(type)
  }
}

const toggleHeadingOne = editor => toggleBlock(editor, 'heading-one')
const toggleHeadingTwo = editor => toggleBlock(editor, 'heading-two')

export default {
  toggleBold,
  toggleItalic,
  toggleBlock,
  toggleHeadingOne,
  toggleHeadingTwo
}
