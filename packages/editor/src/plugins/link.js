import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { keyboardEvent } from '@slate-editor/utils'
import { Styled } from 'theme-ui'

// may need portal to not render inside <p>
const Form = ({ text = '', href = '', rect, onSubmit }) => {
  const [state, setState] = useState({ text, href })
  return createPortal(
    <form
      contentEditable={false}
      onClick={e => {
        e.stopPropagation()
      }}
      onSubmit={e => {
        e.preventDefault()
        onSubmit(state)
      }}
      style={{
        position: 'fixed',
        top: rect.top,
        left: rect.left
      }}
    >
      <label>
        Text
        <input
          type="text"
          name="text"
          value={state.text}
          onChange={e => {
            setState({ ...state, text: e.target.value })
          }}
        />
      </label>
      <label>
        URL
        <input
          type="text"
          name="href"
          value={state.href}
          onChange={e => {
            setState({ ...state, href: e.target.value })
          }}
        />
      </label>
      <button>Update</button>
    </form>,
    document.body
  )
}

const LinkNode = ({ attributes, children, node, editor, ...props }) => {
  const span = useRef(null)
  const [rect, setRect] = useState({})
  useEffect(() => {
    if (!span.current) return
    const elementRect = span.current.getBoundingClientRect()
    setRect(elementRect)
  }, [])

  const href = node.data.get('href')
  const text = node.data.get('text')
  const editing = node.data.get('edit')

  return (
    <span ref={span}>
      <Styled.a {...attributes} href={href}>
        {children}
      </Styled.a>
      {editing && (
        <Form
          rect={rect}
          href={href}
          text={''}
          onSubmit={data => {
            editor.setNodeByKey(node.key, {
              ...data,
              edit: false
            })
          }}
        />
      )}
    </span>
  )
}

// from https://github.com/nossas/slate-editor/blob/develop/packages/slate-editor-link-plugin/src/LinkUtils.js
// and: https://github.com/ianstormtaylor/slate/blob/master/examples/links/index.js
const hasLinks = value => value.inlines.some(inline => inline.type === 'link')
const getLink = value =>
  value.inlines.filter(inline => inline.type === 'link').first()
const hasMultiBlocks = value => value.blocks.size > 1

const unwrapLink = editor => {
  editor.unwrapInline('link')
}

const wrapLink = (editor, data) => {
  editor.wrapInline({
    type: 'link',
    data
  })
}

const insertLink = (editor, placeholder = '[insert link]') => {
  editor
    .insertText(placeholder)
    .moveFocusBackward(placeholder.length)
    .command(wrapLink, { edit: true })
}

export default (opts = {}) => ({
  renderNode: (props, editor, next) => {
    if (props.node.type !== 'link') return next()
    return <LinkNode {...props} />
  },
  onKeyDown: (event, editor, next) => {
    if (keyboardEvent.isMod(event) && event.key === 'k') {
      const { value } = editor
      const { selection } = value
      if (hasLinks(value)) {
        // remove the link
        editor.command(unwrapLink)
      } else if (selection.isExpanded && !hasMultiBlocks(value)) {
        // convert selection into link
        editor.command(wrapLink, { edit: true })
      } else if (hasMultiBlocks(value)) {
        // todo: wrap elements in link
        // console.log('has multiple blocks')
      } else if (selection.isCollapsed) {
        // todo: insert new link
        editor.command(insertLink)
      }
    }
    next()
  }
})
