import React from 'react'
import styled from 'styled-components'

import { mdComponents as md } from 'unified-ui'

const Bold = styled.strong`
  font-weight: 600;
`

const Code = styled(md.inlineCode)`
  & > span {
    font-family: monaco, monospace;
  }
`

const Italic = styled.em`
  font-style: italic;
`

export default props => {
  const { children, mark, attributes } = props

  switch (mark.type) {
    case 'bold':
      return <Bold {...attributes}>{children}</Bold>
    case 'code':
      return <Code {...attributes}>{children}</Code>
    case 'italic':
      return <Italic {...attributes}>{children}</Italic>
    case 'underlined':
      return <u {...attributes}>{children}</u>
    case 'strikethrough':
      return <s {...attributes}>{children}</s>
  }
}
