import React from 'react'
import { Pre } from '../components/ui'

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
