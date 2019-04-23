import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { findDOMNode } from 'slate-react'

const container = typeof document.body !== 'undefined' && document.body
// const getImage
// const getLink

const useRect = (key, ...args) => {
  const [rect, setRect] = useState({})
  const update = () => {
    window.requestAnimationFrame(() => {
      if (!key) return
      try {
        const el = findDOMNode(key)
        const rect = el.getBoundingClientRect()
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

const Tooltip = props => {
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

  let form
  switch (type) {
    case 'image':
      form = (
        <ImageForm
          src={node.data.get('src')}
          alt={node.data.get('alt')}
          onSubmit={data => {
            props.editor.setNodeByKey(value.focusBlock.key, { data }).deselect()
          }}
        />
      )
      break
    case 'link':
      form = (
        <LinkForm
          href={mark.data.get('href')}
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
  if (!form) return false

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: rect.bottom,
        left: rect.left,
        backgroundColor: '#eee'
      }}
    >
      {form ? (
        form
      ) : (
        <pre>
          Tooltip: {blockType} {markType} {selection.isFocused ? 'focused' : ''}
        </pre>
      )}
    </div>,
    container
  )
}

// temporary editing forms
const ImageForm = ({ src = '', alt = '', onSubmit }) => {
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
      <button>Save</button>
    </form>
  )
}

const LinkForm = ({ text = '', href = '', onSubmit }) => {
  const [state, setState] = useState({ text, href })
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
        <button>Save</button>
      </form>
      Open link:{' '}
      <a href={state.href} target="_blank">
        {state.href}
      </a>
    </div>
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
