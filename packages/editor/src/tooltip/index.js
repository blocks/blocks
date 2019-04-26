/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { findDOMNode } from 'slate-react'

const container = typeof document.body !== 'undefined' && document.body

const useRect = (key, ...args) => {
  const [rect, setRect] = useState({})
  const update = () => {
    window.requestAnimationFrame(() => {
      if (!key) return
      try {
        const el = findDOMNode(key)
        const rect = el.getBoundingClientRect()
        rect.clientHeight = document.documentElement.clientHeight
        rect.scrollY = window.scrollY
        rect.maxHeight = rect.clientHeight + rect.scrollY
        // todo: find cursor left?
        setRect(rect)
      } catch (e) {}
    })
  }
  useEffect(() => {
    update()
    window.addEventListener('scroll', update)
    return () => {
      window.removeEventListener('scroll', update)
    }
  }, [key, ...args])

  return rect
}

const Card = props => (
  <div
    {...props}
    css={{
      padding: 16,
      margin: 8,
      backgroundColor: 'white',
      borderRadius: 4,
      boxShadow: '0 0 1px rgba(0, 0, 0, .125), 0 1px 4px rgba(0, 0, 0, .125)'
    }}
  />
)

export const Tooltip = ({ editor, type, children }) => {
  const { value } = editor
  const node = value.focusBlock

  const rect = useRect(node && node.key)

  if (!container) return false
  if (!editor.isActive(type)) return false

  let top = rect.bottom
  let bottom

  // todo: get Card height
  if (rect.bottom + rect.height + 128 > rect.maxHeight) {
    top = null
    bottom = 32
  }

  return createPortal(
    <Card
      style={{
        position: 'fixed',
        top,
        bottom,
        left: rect.left
      }}
    >
      {children}
    </Card>,
    container
  )
}

export default Tooltip
