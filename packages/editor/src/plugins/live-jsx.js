import React from 'react'
import { LiveProvider, LivePreview, LiveError } from 'react-live'
import CodeBlock from '../components/CodeBlock'

export default (opts = {}) => ({
  renderNode: (props, editor, next) => {
    const { node, attributes, children } = props
    if (node.type !== 'jsx') return next()

    return (
      <React.Fragment>
        <CodeBlock {...attributes}>{children}</CodeBlock>
        <LiveProvider code={node.getText()}>
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </React.Fragment>
    )
  }
})
