import React from 'react'
import { Styled } from 'theme-ui'

export default (props, editor, next) => {
  const { node, attributes, children } = props

  switch (node.type) {
    case 'block-quote':
      return <Styled.blockquote {...attributes}>{children}</Styled.blockquote>
    case 'bulleted-list':
      return <Styled.ul {...attributes}>{children}</Styled.ul>
    case 'numbered-list':
      return <Styled.ol {...attributes}>{children}</Styled.ol>
    case 'list-item':
      return <Styled.li {...attributes}>{children}</Styled.li>
    case 'list-item-child':
      return <Styled.p {...attributes}>{children}</Styled.p>
    case 'heading-one':
      return <Styled.h1 {...attributes}>{children}</Styled.h1>
    case 'heading-two':
      return <Styled.h2 {...attributes}>{children}</Styled.h2>
    case 'heading-three':
      return <Styled.h3 {...attributes}>{children}</Styled.h3>
    case 'heading-four':
      return <Styled.h4 {...attributes}>{children}</Styled.h4>
    case 'heading-five':
      return <Styled.h5 {...attributes}>{children}</Styled.h5>
    case 'heading-six':
      return <Styled.h6 {...attributes}>{children}</Styled.h6>
    case 'list-item':
      return <Styled.li {...attributes}>{children}</Styled.li>
    case 'paragraph':
      return <Styled.p {...attributes}>{children}</Styled.p>
    case 'hr':
      return <Styled.hr {...attributes} />
    default:
      return next()
  }
}
