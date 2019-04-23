import React from 'react'
import { Styled } from 'theme-ui'

export default (opts = {}) => ({
  renderNode: (props, editor, next) => {
    const { node, attributes, children } = props
    switch (node.type) {
      case 'bulleted-list':
        return <Styled.ul>{children}</Styled.ul>
      case 'list-item':
        return <Styled.ol>{children}</Styled.ol>
      default:
        return next()
    }
  }
})
