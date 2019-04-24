/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { findDOMNode } from 'slate-react'

import LinkForm from './LinkForm'
import ImageForm from './ImageForm'

const container = typeof document.body !== 'undefined' && document.body

const useRect = (key, ...args) => {
  const [rect, setRect] = useState({})
  const update = () => {
    window.requestAnimationFrame(() => {
      if (!key) return
      try {
        const el = findDOMNode(key)
        const rect = el.getBoundingClientRect()
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

export default props => {
  const { value } = props.editor
  const { selection } = value
  const { focus } = selection

  const node = value.focusBlock
  const mark = value.inlines.first()
  const blockType = node && node.type
  const markType = mark && mark.type
  const type = markType || blockType

  const rect = useRect(node && node.key)

  if (!container) return false
  if (selection.isCollapsed && blockType !== 'image') return false

  const forms = []
  if (type === 'image') {
    forms.push(
      <ImageForm
        key="image-form"
        src={node.data.get('src')}
        alt={node.data.get('alt')}
        onSubmit={data => {
          props.editor.setNodeByKey(value.focusBlock.key, { data }).deselect()
        }}
      />
    )
  }
  if (type === 'link') {
    forms.push(
      <LinkForm
        key="link-form"
        href={mark.data.get('href')}
        title={mark.data.get('title')}
        onSubmit={data => {
          props.editor
            .setNodeByKey(mark.key, {
              data
            })
            .deselect()
        }}
      />
    )
  }

  // (temporary) only render for images and links
  if (!forms.length) return false

  return createPortal(
    <Card
      style={{
        position: 'fixed',
        top: rect.bottom,
        left: rect.left
      }}
    >
      {forms}
    </Card>,
    container
  )
}
