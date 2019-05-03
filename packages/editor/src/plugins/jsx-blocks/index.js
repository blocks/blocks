import React from 'react'
import { Data } from 'slate'
import YouTube from './YouTube'
import Gist from './Gist'

const setJSXProps = (editor, dataObject) => {
  const data = Data.create(dataObject)
  editor.setBlocks({ data })
}

const insertJSXBlock = (editor, type, props) => {
  editor.insertBlock({
    type: 'jsx-void',
    data: {
      type,
      props: Data.create(props)
    }
  })
}

const insertYouTube = editor => {
  editor.insertJSXBlock('YouTube', {
    videoId: ''
  })
}

const insertGist = editor => {
  editor.insertJSXBlock('Gist', {
    id: ''
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
    insertGist,
    setJSXProps
  },
  renderNode: (props, editor, next) => {
    const { node } = props
    if (node.type !== 'jsx-void') return next()
    const component = node.data.get('type')

    switch (component) {
      case 'YouTube':
        return <YouTube {...props} editor={editor} props={getProps(node)} />
        break
      case 'Gist':
        return <Gist {...props} editor={editor} props={getProps(node)} />
        break
      default:
        return next()
    }
  }
})
