import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const StyledMenu = styled.nav`
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

const inlineMarkTypes = [
  'bold',
  'italic',
  'underlined',
  'code',
  'strikethrough'
]

const iconMap = {
  bold: 'format_bold',
  italic: 'format_italic',
  underlined: 'format_underlined',
  code: 'code',
  strikethrough: 'format_strikethrough'
}

class SelectionMenu extends Component {
  handleMouseDown(event, type) {
    const { editor, onChange } = this.props
    event.preventDefault()
    editor.toggleMark(type)
    onChange(editor.value)
  }

  render() {
    const { className, innerRef } = this.props
    const root = window.document.getElementById('portal-root')

    if (window === 'undefined') {
      return null
    }

    return null

    return ReactDOM.createPortal(
      <StyledMenu className={className} ref={innerRef}>
        {inlineMarkTypes.map(type => (
          <a
            key={type}
            style={{ padding: '10px' }}
            onMouseDown={event => {
              this.handleMouseDown(event, type)
            }}
          >
            <img src={`https://icon.now.sh/${iconMap[type]}`} />
          </a>
        ))}
      </StyledMenu>,
      root
    )
  }
}

export default SelectionMenu
