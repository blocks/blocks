import React from 'react'
import { keyboardEvent } from '@slate-editor/utils'
import renderNode from './renderNode'

const insertImage = editor => {
  editor.insertBlock({ type: 'image' }).select()
}

export default (opts = {}) => ({
  commands: {
    insertImage
  },
  renderNode,
  onKeyDown: (event, editor, next) => {
    if (keyboardEvent.isMod(event) && event.shiftKey && event.key === 'I') {
      // ctrl+shift+i
      event.preventDefault()
      editor.insertImage()
    } else {
      next()
    }
  }
})
