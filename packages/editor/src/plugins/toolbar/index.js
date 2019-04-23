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

export default (opts = {}) => ({
  commands: {
    toggleBold,
    toggleItalic,
    toggleLink
  },
  onKeyDown: (event, editor, next) => {
    if (!keyboardEvent.isMod(event)) return next()

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
