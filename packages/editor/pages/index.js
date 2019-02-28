import React from 'react'

import Editor from '../src/components/Editor'

export default () => (
  <Editor
    onChange={({ title, value, emoji }) => {
      //this.setState({ title, value, emoji }, () =>
      //this.save(editDocument)
      //)
    }}
  />
)
