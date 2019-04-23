import React from 'react'
import { Styled } from 'theme-ui'
import CodeBlock from '../components/CodeBlock'

export default (opts = {}) => ({
  renderNode: (props, editor, next) => {
    const { node, attributes, children } = props
    switch (node.type) {
      case 'pre':
        return <CodeBlock {...attributes}>{children}</CodeBlock>
      default:
        return next()
    }
  }
})
