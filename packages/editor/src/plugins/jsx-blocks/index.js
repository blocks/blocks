import React from 'react'
import YouTube from './YouTube'

const setJSXProps = (editor, props, ...args) => {
  editor.setBlocks({ data: { props } })
}

export default (opts = {}) => ({
  commands: {
    setJSXProps
  },
  renderNode: (props, editor, next) => {
    const { node, attributes, children } = props

    switch (node.type) {
      case 'youtube':
        return <YouTube node={node} editor={editor} attributes={attributes} />
        break
      default:
        next()
    }
  }
})
