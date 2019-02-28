import React from 'react'
import styled from 'styled-components'
import { Picker } from 'emoji-mart'

const Wrap = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
`

export const EmojiPicker = props => (
  <Picker emoji="heart_eyes" title="Select an emoji" {...props} />
)

export default ({ expanded, toggleExpanded, ...props }) => (
  <Wrap>
    {expanded ? (
      <EmojiPicker emoji="heart_eyes" title="Select an emoji" {...props} />
    ) : (
      <img src="https://icon.now.sh/face" onClick={toggleExpanded} />
    )}
  </Wrap>
)
