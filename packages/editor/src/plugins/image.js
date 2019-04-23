import React from 'react'
import { keyboardEvent } from '@slate-editor/utils'
import ImageNode from '../components/ImageNode'

const insertImage = editor => {
  editor.insertBlock({ type: 'image' }).select()
}

export default (opts = {}) => ({
  commands: {
    insertImage
  },
  renderNode: (props, editor, next) => {
    if (props.node.type !== 'image') return next()
    return <ImageNode {...props} />
  },
  onKeyDown: (event, editor, next) => {
    if (keyboardEvent.isMod(event) && event.shiftKey && event.key === 'i') {
      editor.insertImage()
    } else {
      next()
    }
  }
})
