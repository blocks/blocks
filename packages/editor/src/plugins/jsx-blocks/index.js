import React from 'react'
import { Data } from 'slate'
import YouTube from './YouTube'

const setJSXProps = (editor, props) => {
  editor.setBlocks({ data: { props: Data.create(props) } })
}

const insertJSXBlock = (editor, type, props) => {
  editor.insertBlock({
    type,
    data: {
      props: Data.create(props)
    }
  })
}

const insertYouTube = editor => {
  editor.insertJSXBlock('youtube', {
    videoId: ''
  })
}

const getProps = node => {
  const map = node.data.get('props')
  if (typeof map.toJS !== 'function') return map
  return map.toJS()
}

export default (opts = {}) => ({
  commands: {
    insertJSXBlock,
    insertYouTube,
    setJSXProps
  },
  renderNode: (props, editor, next) => {
    const { node, attributes, children, isFocused } = props

    switch (node.type) {
      case 'youtube':
        return (
          <YouTube
            node={node}
            editor={editor}
            attributes={attributes}
            props={getProps(node)}
            isFocused={isFocused}
          />
        )
        break
      default:
        next()
    }
  }
})
