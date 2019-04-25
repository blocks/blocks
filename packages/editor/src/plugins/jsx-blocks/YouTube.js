import React, { useState } from 'react'
import Player from 'react-youtube'

const Form = ({ value, onSubmit }) => {
  const [state, setState] = useState({
    videoId: value.videoId
  })
  return (
    <form
      onClick={e => {
        e.stopPropagation()
      }}
      onSubmit={e => {
        e.preventDefault()
        onSubmit(state)
      }}
    >
      <label>
        Video ID:
        <input
          type="text"
          name="videoId"
          value={state.videoId}
          onChange={e => {
            setState({ ...state, videoId: e.target.value })
          }}
        />
      </label>
      <button>Apply</button>
    </form>
  )
}

export default ({ editor, node, attributes }) => {
  const props = node.data.get('props')

  return (
    <div>
      <div {...attributes}>
        <Player {...props} />
      </div>
      <Form
        value={props}
        onSubmit={next => {
          editor.setJSXProps(next)
        }}
      />
    </div>
  )
}
