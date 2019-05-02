/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import Player from 'react-youtube'
import isURL from 'is-url'
import getYouTubeID from 'get-youtube-id'
import Form from './Form'

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

const Overlay = props => (
  <div
    {...props}
    css={{
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0
    }}
  />
)

const getProps = node => {
  const map = node.data.get('props')
  if (!map || typeof map.toJS !== 'function') return map
  return map.toJS()
}

export default ({ editor, node, attributes, props, isSelected }) => {
  return (
    <div>
      <Wrapper
        {...attributes}
        style={{
          outline: isSelected ? '2px solid blue' : null
        }}
      >
        {props.videoId ? <Player {...props} /> : <pre>Enter a YouTube ID</pre>}
        {!isSelected && <Overlay />}
      </Wrapper>
      {isSelected && (
        <Form
          value={props}
          onSubmit={next => {
            if (isURL(next.videoId)) {
              next.videoId = getYouTubeID(next.videoId)
            }
            editor.setJSXProps(next)
          }}
        />
      )}
    </div>
  )
}
