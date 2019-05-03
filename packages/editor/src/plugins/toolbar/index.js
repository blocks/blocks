import React from 'react'

const isActive = (editor, type) => {
  return (
    editor.value.activeMarks.some(mark => mark.type === type) ||
    editor.value.inlines.some(inline => inline.type === type) ||
    editor.hasBlock(type) ||
    editor.hasOuterBlock(type) ||
    editor.hasJSXBlock(type)
  )
}

export default (opts = {}) => ({
  queries: {
    isActive
  }
})
