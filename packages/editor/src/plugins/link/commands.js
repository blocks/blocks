const unwrapLink = editor => {
  editor.unwrapInline('link')
}

const wrapLink = (editor, data) => {
  editor.wrapInline({
    type: 'link',
    data
  })
}

const insertLink = (editor, placeholder = '[insert link]') => {
  editor
    .insertText(placeholder)
    .moveFocusBackward(placeholder.length)
    .command(wrapLink, {})
}

const toggleLink = editor => {
  const { selection } = editor.value
  if (editor.hasLinks()) {
    // remove the link
    editor.command(unwrapLink)
  } else if (selection.isExpanded && !editor.hasMultipleBlocks()) {
    // convert selection into link
    editor.wrapLink()
  } else if (editor.hasMultipleBlocks()) {
    // TODO: wrap elements in link
  } else if (selection.isCollapsed) {
    const block = editor.value.focusBlock
    if (block && block.type === 'image') {
      editor.wrapBlock('link')
    } else {
      editor.insertLink()
    }
  }
}

export default {
  unwrapLink,
  wrapLink,
  insertLink,
  toggleLink
}
