import React, { useState, useRef, useEffect } from 'react'
import { getEventTransfer } from 'slate-react'
import { createPortal } from 'react-dom'
import { keyboardEvent } from '@slate-editor/utils'
import { Styled } from 'theme-ui'
import isURL from 'is-url'

// from https://github.com/nossas/slate-editor/blob/develop/packages/slate-editor-link-plugin/src/LinkUtils.js
// and: https://github.com/ianstormtaylor/slate/blob/master/examples/links/index.js
const hasLinks = value => value.inlines.some(inline => inline.type === 'link')
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
  onKeyDown: (event, editor, next) => {
    if (keyboardEvent.isMod(event) && event.key === 'k') {
      const { value } = editor
      const { selection } = value
      if (hasLinks(value)) {
        // remove the link
        editor.command(unwrapLink)
      } else if (selection.isExpanded && !hasMultiBlocks(value)) {
        // convert selection into link
        editor.command(wrapLink, {})
      } else if (hasMultiBlocks(value)) {
        // todo: wrap elements in link
        // console.log('has multiple blocks')
      } else if (selection.isCollapsed) {
        // todo: insert new link
        editor.command(insertLink)
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

    if (hasLinks(value)) {
      editor.command(unwrapLink)
    }

    editor.command(wrapLink, { href: text })
  }
})
