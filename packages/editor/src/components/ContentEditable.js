import React, { Component } from 'react'

class ContentEditable extends Component {
  constructor() {
    super()
    this.editor = React.createRef()
  }

  handleInput = e => {
    console.log('INPUT', this.editor.current.innerHTML)
  }

  handleBlur = e => {
    console.log('BLUR', this.editor.current.innerHTML)
  }

  render() {
    const { children, ...props } = this.props

    return (
      <div
        ref={this.editor}
        contentEditable="true"
        onBlur={this.handleBlur}
        onInput={this.handleInput}
        dangerouslySetInnerHTML={{ __html: children }}
        {...props}
      />
    )
  }
}

export default ContentEditable
