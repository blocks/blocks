/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import Player from 'react-youtube'

const Form = ({ value, onSubmit }) => {
  const [state, setState] = useState({
    videoId: value.videoId || ''
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

const Wrapper = props => (
  <div
    {...props}
    css={{
      width: '100%',
      height: 0,
      paddingBottom: 900 / 16 + '%',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#eee',
      iframe: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        border: 0
      }
    }}
  />
)

export default ({ editor, node, attributes, props, isFocused }) => {
  return (
    <div
      {...attributes}
      style={{
        outline: isFocused ? '2px solid blue' : null
      }}
    >
      <Wrapper>
        {props.videoId ? <Player {...props} /> : <pre>Enter a YouTube ID</pre>}
      </Wrapper>
      <Form
        value={props}
        onSubmit={next => {
          editor.setJSXProps(next)
        }}
      />
    </div>
  )
}
