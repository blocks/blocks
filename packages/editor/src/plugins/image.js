import React from 'react'
import { keyboardEvent } from '@slate-editor/utils'
import ImageNode from '../components/ImageNode'

export default (opts = {}) => ({
  renderNode: (props, editor, next) => {
    return <ImageNode {...props} />
  },
  onKeyDown: (event, editor, next) => {
    if (keyboardEvent.isMod(event) && event.shiftKey && event.key === 'i') {
      editor.insertBlock({
        type: 'image',
        data: {}
      })
    } else {
      next()
    }
  }
})
