import React from 'react'
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

const DEFAULT_BLOCK = 'paragraph'

const hasBlock = (editor, type) => {
  return editor.value.blocks.some(node => node.type === type)
}

const toggleBlock = (editor, type, data) => {
  console.log('toggleBlock', type, data)
  if (editor.hasBlock(type)) {
    editor.setBlocks(DEFAULT_BLOCK)
  } else {
    editor.setBlocks(type).setBlocks({ data })
  }
}

const toggleBlockQuote = editor => {
  if (editor.hasOuterBlock('block-quote')) {
    editor.unwrapBlock('block-quote')
  } else {
    editor.wrapBlock('block-quote')
  }
}

const toggleHeadingOne = editor => toggleBlock(editor, 'heading-one')
const toggleHeadingTwo = editor => toggleBlock(editor, 'heading-two')
const toggleJSX = editor => toggleBlock(editor, 'jsx')
const togglePre = editor => toggleBlock(editor, 'pre')

// Certain nodes like list-items and block-quotes have an inner
// paragraph so we need to query the parent node rather than
// the start block
const hasOuterBlock = (editor, type) => {
  const { value } = editor
  const { startBlock, document } = value

  if (!startBlock) {
    return false
  }

  const outerBlock = document.getParent(startBlock.key)

  return outerBlock && outerBlock.type === type
}

export default (opts = {}) => ({
  queries: {
    hasBlock,
    hasOuterBlock
  },
  commands: {
    toggleBold,
    toggleItalic,
    toggleBlock,
    toggleBlockQuote,
    toggleHeadingOne,
    toggleHeadingTwo,
    toggleJSX,
    togglePre
  },
  onKeyDown: (event, editor, next) => {
    if (!keyboardEvent.isMod(event)) return next()
    const opt = event.altKey

    if (opt) {
      switch (event.keyCode) {
        // Q
        case 81:
          editor.toggleBlockQuote()
          break
        // 1
        case 49:
          editor.toggleHeadingOne()
          break
        // 2
        case 50:
          editor.toggleHeadingTwo()
          break
        default:
          return next()
      }
    }

    // these could live elsewhere...
    switch (event.key) {
      case 'b':
        editor.toggleBold()
        break
      case 'i':
        editor.toggleItalic()
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
