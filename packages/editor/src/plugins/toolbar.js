import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { findDOMNode } from 'slate-react'

const container = typeof document.body !== 'undefined' && document.body

const Tooltip = props => {
  const [rect, setRect] = useState({})
  const { value } = props.editor
  const { selection } = value
  const { focus } = selection

  const blockType = value.focusBlock && value.focusBlock.type
  const markType = value.marks.first() && value.marks.first().type

  if (selection.isCollapsed && blockType !== 'image') return false

  useEffect(() => {
    if (!value.focusBlock || !value.focusBlock.key) return
    const el = findDOMNode(value.focusBlock.key)
    const rect = el.getBoundingClientRect()
    setRect(rect)
  }, [focus.key, blockType])

  // if (!value.startBlock) return <pre>No startBlock</pre>
  // const link = getLink(value)
  // if (link) return <pre>Link focused</pre>

  return createPortal(
    <pre
      style={{
        position: 'fixed',
        top: rect.bottom,
        left: rect.left,
        backgroundColor: '#eee'
      }}
    >
      Tooltip: {blockType} {markType} {selection.isFocused ? 'focused' : ''}
    </pre>,
    container
  )
}

export default (opts = {}) => ({
  renderEditor: (props, editor, next) => {
    const children = next()

    return (
      <React.Fragment>
        {children}
        <Tooltip editor={editor} />
      </React.Fragment>
    )
  }
})
