import React from 'react'

import { Styled as md } from './ui'

export default props => {
  const { children, mark, attributes } = props

  switch (mark.type) {
    case 'bold':
      return <md.strong {...attributes}>{children}</md.strong>
    case 'code':
      return <md.inlineCode {...attributes}>{children}</md.inlineCode>
    case 'italic':
      return <md.em {...attributes}>{children}</md.em>
    case 'underlined':
      return <u {...attributes}>{children}</u>
    case 'strikethrough':
      return <s {...attributes}>{children}</s>
    default: {
    }
  }
}
