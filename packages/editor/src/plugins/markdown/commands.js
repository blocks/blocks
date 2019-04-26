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

const toggleHeadingOne = editor => editor.toggleBlock('heading-one')
const toggleHeadingTwo = editor => editor.toggleBlock('heading-two')
const togglePre = editor => editor.toggleBlock('pre')

const toggleBulletedList = editor => {
  const {
    value: { startBlock, document }
  } = editor
  const parent = document.getParent(startBlock.key)

  const isList =
    parent && (parent.type === 'list-item-child' || parent.type === 'list-item')

  return isList
    ? editor.unwrapList()
    : editor.wrapList({ type: 'bulleted-list' })
}

const toggleNumberedList = editor => {
  const {
    value: { startBlock, document }
  } = editor
  const parent = document.getParent(startBlock.key)

  const isList =
    parent && (parent.type === 'list-item-child' || parent.type === 'list-item')

  return isList
    ? editor.unwrapList()
    : editor.wrapList({ type: 'numbered-list' })
}

const toggleBlockQuote = editor => {
  if (editor.hasOuterBlock('block-quote')) {
    editor.unwrapBlock('block-quote')
  } else {
    editor.wrapBlock('block-quote')
  }
}

const toggleDivider = editor => {
  const {
    value: { startBlock }
  } = editor

  if (startBlock.type === 'hr') {
    editor.setBlocks('paragraph')
  } else {
    editor.insertBlock({ type: 'hr' })
  }
}

export default {
  toggleBold,
  toggleItalic,
  toggleBlock,
  toggleHeadingOne,
  toggleHeadingTwo,
  togglePre,
  toggleBulletedList,
  toggleNumberedList,
  toggleBlockQuote,
  toggleDivider
}
