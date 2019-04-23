import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { findDOMNode } from 'slate-react'
import { keyboardEvent } from '@slate-editor/utils'
import { ThemeProvider } from 'theme-ui'

import theme from '../../components/theme'
import Toolbar from './Toolbar'
import Tooltip from './Tooltip'

const toggleBold = editor => {
  editor.toggleMark('bold').focus()
}

const toggleItalic = editor => {
  editor.toggleMark('italic').focus()
}

const toggleLink = editor => {
  if (editor.hasLinks()) {
    editor.unwrapLink()
  } else {
    editor.wrapLink()
  }
}

const toggleBlockQuote = editor => {
  if (editor.hasBlock('block-quote')) {
    console.log('its a block-quote!')
  } else {
    console.log('not a block-quote!')
  }
}

const hasBlock = (editor, type) => {
  // todo... not currently working
  const is = editor.value.blocks.some(node => node.type === type)
  console.log(type, is, editor.value.blocks.toJS())
  return is
}

export default (opts = {}) => ({
  queries: {
    hasBlock
  },
  commands: {
    toggleBold,
    toggleItalic,
    toggleLink,
    toggleBlockQuote
  },
  onKeyDown: (event, editor, next) => {
    if (!keyboardEvent.isMod(event)) return next()

    // these could live elsewhere...
    switch (event.key) {
      case 'b':
        toggleBold(editor)
        break
      case 'i':
        toggleItalic(editor)
        break
      default:
        next()
    }
  },
  renderEditor: (props, editor, next) => {
    const children = next()

    return (
      <ThemeProvider theme={theme}>
        <Toolbar editor={editor} />
        {children}
        <Tooltip editor={editor} />
      </ThemeProvider>
    )
  }
})
