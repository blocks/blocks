/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Data } from 'slate'
import Form from './Form'
import Overlay from './Overlay'
import YouTube from './YouTube'
import Tweet from './Tweet'
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

const insertTweet = editor => {
  editor.insertJSXBlock('tweet', {
    tweetId: ''
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

const Wrapper = ({
  editor,
  attributes,
  isSelected,
  component,
  Component,
  props,
  fields
}) => {
  return (
    <div>
      <div
        {...attributes}
        style={{
          position: 'relative',
          outline: isSelected ? '2px solid blue' : null
        }}
      >
        <Component {...props} />
        {!isSelected && <Overlay />}
      </div>
      {isSelected && (
        <Form
          fields={fields}
          value={props}
          onSubmit={next => {
            editor.setJSXProps({
              type: component,
              props: next
            })
          }}
        />
      )}
    </div>
  )
}

// placeholder
const components = {
  YouTube,
  Gist,
  Tweet
}

export default (opts = {}) => ({
  commands: {
    insertJSXBlock,
    insertYouTube,
    insertTweet,
    insertGist,
    setJSXProps
  },
  renderNode: (props, editor, next) => {
    const { node } = props
    if (node.type !== 'jsx-void') return next()
    const type = node.data.get('type')

    if (components[type]) {
      const Component = components[type]
      return (
        <Wrapper
          {...props}
          editor={editor}
          Component={Component}
          component={type}
          props={getProps(node)}
          fields={Component.propertyControls}
        />
      )
    }

    return next()
  }
})
