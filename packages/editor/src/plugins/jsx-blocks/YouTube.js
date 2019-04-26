/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import Player from 'react-youtube'
import { Flex } from 'theme-ui/layout'
import isURL from 'is-url'
import getYouTubeID from 'get-youtube-id'

import Label from '../toolbar/Label'
import Input from '../toolbar/Input'
import Button from '../toolbar/Button'

export const YouTubeForm = ({ value, onSubmit }) => {
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
      <Flex flexWrap="wrap" alignItems="flex-end">
        <Label mr={2}>
          Video ID:
          <Input
            type="text"
            name="videoId"
            value={state.videoId}
            onChange={e => {
              const videoId = isURL(e.target.value)
                ? getYouTubeID(e.target.value)
                : e.target.value
              setState({ ...state, videoId })
            }}
          />
        </Label>
        <Button>Apply</Button>
      </Flex>
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

export default ({ editor, node, attributes, props, isFocused }) => {
  return (
    <Wrapper
      {...attributes}
      style={{
        outline: isFocused ? '2px solid blue' : null
      }}
    >
      {props.videoId ? <Player {...props} /> : <pre>Enter a YouTube ID</pre>}
      {!isFocused && <Overlay />}
    </Wrapper>
  )
}
