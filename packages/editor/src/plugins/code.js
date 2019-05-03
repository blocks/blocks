/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { css } from 'theme-ui'

const Pre = props => (
  <pre
    {...props}
    css={css({
      bg: 'lightgray',
      p: 3,
      fontFamily: 'monospace'
    })}
  />
)

export default (opts = {}) => ({
  renderNode: (props, editor, next) => {
    const { node, attributes, children } = props
    switch (node.type) {
      case 'pre':
        return <Pre {...attributes}>{children}</Pre>
      default:
        return next()
    }
  }
})
