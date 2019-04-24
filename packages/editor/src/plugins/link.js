import { getEventTransfer } from 'slate-react'
import { keyboardEvent } from '@slate-editor/utils'
import isURL from 'is-url'

// from https://github.com/nossas/slate-editor/blob/develop/packages/slate-editor-link-plugin/src/LinkUtils.js
// and: https://github.com/ianstormtaylor/slate/blob/master/examples/links/index.js
const hasLinks = editor => {
  return editor.value.inlines.some(inline => inline.type === 'link')
}
// const getLink = value => value.inlines.filter(inline => inline.type === 'link').first()
const hasMultipleBlocks = editor => editor.value.blocks.size > 1

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

export default (opts = {}) => ({
  queries: {
    hasLinks,
    hasMultipleBlocks
  },
  commands: {
    unwrapLink,
    wrapLink,
    insertLink,
    toggleLink
  },
  onKeyDown: (event, editor, next) => {
    if (keyboardEvent.isMod(event) && event.key === 'k') {
      editor.toggleLink()
    }
    next()
  },
  onPaste: (event, editor, next) => {
    const { value } = editor
    if (value.selection.isCollapsed) return next()
    const transfer = getEventTransfer(event)
    const { type, text } = transfer
    if (type !== 'text' && type !== 'html') return next()
    if (!isURL(text)) return next()

    if (editor.hasLinks()) {
      editor.command(unwrapLink)
    }

    editor.command(wrapLink, { href: text })
  }
})
