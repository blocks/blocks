import React, { useState } from 'react'

export default ({ title = '', href = '', onSubmit }) => {
  const [state, setState] = useState({ title, href })
  return (
    <div>
      <form
        contentEditable={false}
        onClick={e => {
          e.stopPropagation()
        }}
        onSubmit={e => {
          e.preventDefault()
          onSubmit(state)
        }}
      >
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
        <label>
          Title
          <input
            type="text"
            name="title"
            value={state.title}
            onChange={e => {
              setState({ ...state, title: e.target.value })
            }}
          />
        </label>
        <button>Save</button>
      </form>
      Open link:{' '}
      <a href={state.href} target="_blank">
        {state.href}
      </a>
    </div>
  )
}
