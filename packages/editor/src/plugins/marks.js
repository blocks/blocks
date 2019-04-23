import React from 'react'
import { Styled } from 'theme-ui'

export default (opts = {}) => ({
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
  }
})
