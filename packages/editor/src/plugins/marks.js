import React from 'react'
import { keyboardEvent } from '@slate-editor/utils'
import { Styled } from 'theme-ui'

const toggleBold = editor => {
  editor.toggleMark('bold').focus()
}

const toggleItalic = editor => {
  editor.toggleMark('italic').focus()
}

export default (opts = {}) => ({
  commands: {
    toggleBold,
    toggleItalic
  },
  renderMark: (props, editor, next) => {
    const { mark, attributes, children } = props

    switch (mark.type) {
      case 'bold':
        return <Styled.strong {...attributes}>{children}</Styled.strong>
      case 'code':
        return <Styled.inlineCode {...attributes}>{children}</Styled.inlineCode>
      case 'italic':
        return <Styled.em {...attributes}>{children}</Styled.em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      case 'strikethrough':
        return <s {...attributes}>{children}</s>
      default:
        return next()
    }
  },
  onKeyDown: (event, editor, next) => {
    if (!keyboardEvent.isMod(event)) return next()
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
  }
})
