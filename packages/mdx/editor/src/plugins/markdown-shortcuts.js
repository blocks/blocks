import { Mark, Point, Range } from 'slate'
import { getTypeFromMarkdown, isAllChar } from '../lib/util'

const handleSpace = (event, editor) => {
  const { value } = editor
  const { selection } = value
  if (selection.isExpanded) return

  const { startBlock } = value
  const { start } = selection

  const chars = startBlock.text.slice(0, start.offset).replace(/\s*/g, '')
  const type = getTypeFromMarkdown(chars)

  if (!type) return

  if (type === 'bulleted-list-item') {
    return editor
      .wrapList({ type: 'bulleted-list' })
      .moveFocusToStartOfNode(startBlock)
      .delete()
  } else if (type === 'numbered-list-item') {
    return editor
      .wrapList({ type: 'numbered-list' })
      .moveFocusToStartOfNode(startBlock)
      .delete()
  }

  if (type === 'pre') {
    event.preventDefault()
    startBlock.nodes.forEach(node => editor.removeNodeByKey(node.key))
    editor.insertBlock('pre')
    return
  }

  event.preventDefault()

  if (type === 'hr') {
    editor.moveFocusToStartOfNode(startBlock).delete()
    editor.insertBlock('hr')
    return
  }

  if (type === 'block-quote') {
    return editor
      .moveFocusToStartOfNode(startBlock)
      .delete()
      .wrapBlock('block-quote')
  }

  editor.setBlocks(type)

  editor.moveFocusToStartOfNode(startBlock).delete()
  return true
}

const handleInlineMark = (event, editor, next, { character, type }) => {
  const { texts, selection } = editor.value
  const currentTextNode = texts.get(0)
  const currentLineText = currentTextNode.text

  if (isAllChar(character, currentLineText)) {
    return next()
  }

  const [other, remainder] = currentLineText.startsWith(character)
    ? ['', currentLineText.replace(character, '')]
    : currentLineText.split(character)

  if (remainder) {
    const offset = selection.focus.offset
    const isBackwards = offset < other.length
    const inlineCode = isBackwards
      ? other.slice(offset)
      : remainder.slice(0, offset - other.length - 1)

    event.preventDefault()

    const anchor = Point.create({
      key: currentTextNode.key,
      path: currentTextNode.path,
      offset: isBackwards ? offset : other.length
    })
    const focus = Point.create({
      key: currentTextNode.key,
      path: currentTextNode.path,
      offset: isBackwards ? other.length + 1 : offset
    })
    const range = Range.create({
      anchor,
      focus
    })

    return editor
      .deleteAtRange(range)
      .insertTextByKey(
        currentTextNode.key,
        isBackwards ? offset : other.length,
        inlineCode,
        [Mark.create({ type })]
      )
      .command(editor =>
        editor.value.marks.forEach(mark => {
          editor.removeMark(mark)
        })
      )
  }

  next()
}

const handleBackspace = (event, editor, next) => {
  const { value } = editor
  const { selection } = value

  if (selection.isExpanded) {
    return next()
  }

  if (selection.start.offset !== 0) {
    return next()
  }

  const { startBlock } = value
  if (startBlock.type === 'paragraph') {
    return next()
  }

  event.preventDefault()
  editor.setBlocks('paragraph')

  return next()
}

const handleEnter = (event, editor, next) => {
  const { value } = editor
  const { selection } = value
  const { start, end, isExpanded } = selection
  if (isExpanded) return

  const { startBlock } = value

  if (startBlock.type === 'pre' || startBlock.type === 'jsx') {
    return editor.insertText('\n')
  }

  // Enter was pressed with no content, reset the node to be an empty paragraph
  if (start.offset === 0 && startBlock.text.length === 0) {
    return handleBackspace(event, editor, next)
  }

  // The cursor is at the beginning of the line of a node with text. We should insert
  // a new node before the current one.
  if (end.offset === 0 && startBlock.text.length !== 0) {
    return editor.insertBlock('paragraph')
  }

  if (end.offset !== startBlock.text.length) {
    return editor.splitBlock().setBlocks('paragraph')
  }

  // Started a code/jsx/hr block
  const type = getTypeFromMarkdown(startBlock.text)
  if (type === 'pre' || type === 'jsx') {
    return editor
      .setBlocks(type)
      .moveFocusToStartOfNode(startBlock)
      .delete()
  } else if (type === 'hr') {
    return editor
      .moveFocusToStartOfNode(startBlock)
      .delete()
      .setBlocks('hr')
      .insertBlock('paragraph')
  } else if (type === 'table') {
    editor.moveFocusToStartOfNode(startBlock).delete()
    return editor.editor.insertTable()
  }

  if (
    startBlock.type !== 'heading-one' &&
    startBlock.type !== 'heading-two' &&
    startBlock.type !== 'heading-three' &&
    startBlock.type !== 'heading-four' &&
    startBlock.type !== 'heading-five' &&
    startBlock.type !== 'heading-six' &&
    startBlock.type !== 'block-quote'
  ) {
    return next()
  }

  event.preventDefault()
  editor.splitBlock().setBlocks('paragraph')
}

// Soft tabs
const handleTab = (event, editor) => {
  event.preventDefault()
  return editor.insertText('  ')
}

export default (opts = {}) => ({
  onKeyDown: (event, editor, next) => {
    switch (event.key) {
      case ' ':
        return handleSpace(event, editor)
      case '`':
        return handleInlineMark(event, editor, next, {
          character: '`',
          type: 'code'
        })
      case '*':
        return handleInlineMark(event, editor, next, {
          character: '*',
          type: 'bold'
        })
      case '_':
        return handleInlineMark(event, editor, next, {
          character: '_',
          type: 'italic'
        })
      case 'Backspace':
        return handleBackspace(event, editor, next)
      case 'Enter':
        return handleEnter(event, editor, next)
      case 'Tab':
        return handleTab(event, editor, next)
      default:
        return next()
    }
  }
})
