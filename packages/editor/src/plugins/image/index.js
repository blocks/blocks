import React from 'react'
import { keyboardEvent } from '@slate-editor/utils'
import ImageNode from './ImageNode'
import Tooltip from './tooltip'

const insertImage = editor => {
  editor.insertBlock({ type: 'image' }).select()
}

export default (opts = {}) => ({
  commands: {
    insertImage
  },
  renderEditor: (props, editor, next) => {
    const children = next()
    return (
      <>
        {children}
        <Tooltip type="image" editor={editor} />
      </>
    )
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
