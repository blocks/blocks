import React, { Component } from 'react'
import styled from 'styled-components'

import { Flex } from './ui'
import { EmojiPicker } from './EmojiPicker'

const Input = styled.input({
  appearance: 'none',
  WebkitAppearance: 'none',
  border: 'none',
  fontSize: '48px',
  fontWeight: 600,
  marginTop: '64px',
  marginBottom: '24px',
  '&:focus': {
    outline: 'none'
  }
})

const InputWrap = styled.div({
  position: 'relative'
})

const EmojiWrap = styled.span({
  position: 'relative',
  top: '20px',
  marginRight: '8px',
  fontSize: '60px'
})

const EmojiPickerWrap = styled.div({
  position: 'absolute',
  left: 0,
  top: 0
})

class TitleInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: props.title || '',
      emoji: props.emoji || '',
      showEmojiDropdown: false
    }
  }

  emitChange = () => {
    const { title, emoji } = this.state
    this.props.onChange({ title, emoji })
  }

  handleTitleChange = e => {
    const title = e.target.value
    this.setState({ title }, this.emitChange)
  }

  handleEmojiSelect = e => {
    const emoji = e.native
    this.setState({ emoji, showEmojiDropdown: false }, this.emitChange)
  }

  handleEmojiClick = () => {
    const { showEmojiDropdown } = this.state
    this.setState({ showEmojiDropdown: !showEmojiDropdown })
  }

  render() {
    const { title, emoji, showEmojiDropdown } = this.state

    return (
      <Flex alignItems="center">
        <InputWrap>
          <EmojiWrap onClick={this.handleEmojiClick} children={emoji || '❔'} />
          {showEmojiDropdown ? (
            <EmojiPickerWrap>
              <EmojiPicker onSelect={this.handleEmojiSelect} />
            </EmojiPickerWrap>
          ) : null}
        </InputWrap>
        <Input
          value={title}
          placeholder={this.props.placeholder}
          onChange={this.handleTitleChange}
        />
      </Flex>
    )
  }
}

export default TitleInput
