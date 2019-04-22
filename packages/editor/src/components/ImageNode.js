/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState, useRef } from 'react'
import { Styled } from 'theme-ui'
import {
  AlertDialog,
  AlertDialogLabel,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogContent
} from '@reach/alert-dialog'

const Dialog = props => {
  const ref = useRef(null)

  return (
    <AlertDialog leastDestructiveRef={ref}>
      <AlertDialogLabel>Insert Image URL</AlertDialogLabel>
      <AlertDialogContent>Beep boop</AlertDialogContent>
    </AlertDialog>
  )
}

const Form = ({ src = '', alt = '', onSubmit }) => {
  const [state, setState] = useState({ src, alt })
  // todo: how should this work??
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
  const [open, setOpen] = useState()
  const src = node.data.get('src')

  if (!src) {
    return (
      <>
        <div
          {...attributes}
          css={{
            padding: 32,
            backgroundColor: '#eee'
          }}
        />
        <Form
          onSubmit={data => {
            editor.setNodeByKey(node.key, { data })
          }}
        />
      </>
    )
  }

  return (
    <>
      <Styled.img {...attributes} src={src} />
      <pre>{src}</pre>
      {open && <Dialog />}
    </>
  )
}
