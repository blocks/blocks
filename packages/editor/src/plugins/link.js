import React, { useState, useRef, useEffect } from 'react'
import { getEventTransfer } from 'slate-react'
import { createPortal } from 'react-dom'
import { keyboardEvent } from '@slate-editor/utils'
import { Styled } from 'theme-ui'
import isURL from 'is-url'

// from https://github.com/nossas/slate-editor/blob/develop/packages/slate-editor-link-plugin/src/LinkUtils.js
// and: https://github.com/ianstormtaylor/slate/blob/master/examples/links/index.js
const hasLinks = editor => {
  return editor.value.inlines.some(inline => inline.type === 'link')
}
// const getLink = value => value.inlines.filter(inline => inline.type === 'link').first()
const hasMultiBlocks = value => value.blocks.size > 1

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

export default (opts = {}) => ({
  queries: {
    hasLinks
  },
  commands: {
    unwrapLink,
    wrapLink,
    insertLink
  },
  onKeyDown: (event, editor, next) => {
    if (keyboardEvent.isMod(event) && event.key === 'k') {
      const { value } = editor
      const { selection } = value
      if (editor.hasLinks()) {
        // remove the link
        editor.command(unwrapLink)
      } else if (selection.isExpanded && !hasMultiBlocks(value)) {
        // convert selection into link
        editor.command(wrapLink, {})
      } else if (hasMultiBlocks(value)) {
        // todo: wrap elements in link
      } else if (selection.isCollapsed) {
        // todo: handle wrapping images
        const block = value.focusBlock
        if (block && block.type === 'image') {
          editor.wrapBlock('link')
        } else {
          editor.command(insertLink)
        }
      }
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
