// positioned modal box for editing forms
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const defaultContainer = typeof document !== 'undefined' ? document.body : null

export default ({ wrapperRef, container = defaultContainer, ...props }) => {
  const [rect, setRect] = useState({})
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const position = el.getBoundingClientRect()
    setRect(position)
  }, [])

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: rect.bottom,
        left: rect.left
        // todo: handle window edges
      }}
    >
      <div {...props} />
    </div>,
    container
  )
}
