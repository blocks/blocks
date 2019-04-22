/** @jsx jsx */
import React, { useRef } from 'react'
import { jsx } from '@emotion/core'
import { useState } from 'react'
import { Styled } from 'theme-ui'
import Modal from './Modal'

const Form = ({ src = '', alt = '', onSubmit }) => {
  const [state, setState] = useState({ src, alt })

  return (
    <form
      onClick={e => {
        e.stopPropagation()
      }}
      onSubmit={e => {
        e.preventDefault()
        onSubmit(state)
      }}
    >
      <label>
        Image URL
        <input
          type="text"
          name="url"
          value={state.src}
          onChange={e => {
            setState({ ...state, src: e.target.value })
          }}
        />
      </label>
      <label>
        Alt text
        <input
          type="text"
          name="alt"
          value={state.alt}
          onChange={e => {
            setState({ ...state, alt: e.target.value })
          }}
        />
      </label>
      <button>Insert Image</button>
    </form>
  )
}

export default ({ attributes, node, editor, onChange, ...props }) => {
  const span = useRef(null)
  const src = node.data.get('src')

  return (
    <span ref={span}>
      <Styled.img {...attributes} src={src} />
      {!src && (
        <Modal wrapperRef={span}>
          <Form
            onSubmit={data => {
              editor.setNodeByKey(node.key, { data })
            }}
          />
        </Modal>
      )}
    </span>
  )
}
