import React, { useState } from 'react'
import Tooltip from '../../tooltip'
import { YouTubeForm } from './YouTube'

const getProps = node => {
  const map = node.data.get('props')
  if (!map || typeof map.toJS !== 'function') return map
  return map.toJS()
}

const Forms = ({ editor }) => {
  const node = editor.value.focusBlock
  if (!node) return false

  return (
    <Tooltip type="youtube" editor={editor}>
      <YouTubeForm
        value={getProps(node)}
        onSubmit={next => {
          editor.setJSXProps(next)
        }}
      />
    </Tooltip>
  )
}

export default (props, editor, next) => {
  const children = next()
  return (
    <>
      {children}
      <Forms editor={editor} />
    </>
  )
}
