import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'nano-style'

const StyledMenu = styled('nav')`
  padding: 8px 7px 6px;
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: #fafafa;
  border-radius: 4px;
  transition: opacity 0.75s;
`

const blockMarkTypes = [
  'image',
  'embedded-link',
  'heading-one',
  'heading-two',
  'heading-three',
  'heading-four',
  'heading-five',
  'heading-six'
]

class CommandMenu extends Component {
  handleMouseDown(event, type) {
    const { value, onChange } = this.props
    event.preventDefault()
    const change = value.change().toggleMark(type)
    onChange(change)
  }

  render() {
    const { className, innerRef } = this.props
    const root = window.document.getElementById('root')

    return ReactDOM.createPortal(
      <StyledMenu className={className} innerRef={innerRef}>
        {inlineMarkTypes.map(type => {
          const { value } = this.props
          const isActive = value.activeMarks.some(mark => mark.type === type)

          return (
            <a
              key={type}
              active={isActive}
              style={{ padding: '10px' }}
              onMouseDown={event => {
                this.handleMouseDown(event, type)
              }}
            >
              <span>{type}</span>
            </a>
          )
        })}
      </StyledMenu>,
      root
    )
  }
}

export default CommandMenu
