/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { Data } from 'slate'
import { Context } from '../../components/context'
import Form from './Form'
import Overlay from './Overlay'

const hasJSXBlock = (editor, type) => {
  if (!editor.hasBlock('jsx-void') && !editor.hasBlock('jsx')) return false
  return editor.value.blocks.some(
    node => node.data && node.data.get('type') === type
  )
}

const setJSXProps = (editor, dataObject) => {
  const data = Data.create(dataObject)
  editor.setBlocks({ data })
}

const insertJSXBlock = (editor, type, props) => {
  editor.insertBlock({
    type: 'jsx-void',
    data: {
      type,
      props: Data.create(props)
    }
  })
}

const getProps = node => {
  const map = node.data.get('props')
  if (typeof map.toJS !== 'function') return map
  return map.toJS()
}

const Wrapper = ({
  editor,
  attributes,
  isSelected,
  component,
  Component,
  props,
  fields = {}
}) => {
  return (
    <div>
      <div
        {...attributes}
        style={{
          position: 'relative',
          outline: isSelected ? '2px solid blue' : null
        }}
      >
        <Component {...props} />
        {!isSelected && <Overlay />}
      </div>
      {isSelected && (
        <Form
          fields={fields}
          value={props}
          onSubmit={next => {
            editor.setJSXProps({
              type: component,
              props: next
            })
          }}
        />
      )}
    </div>
  )
}

const Node = ({ type, next, ...props }) => {
  const { components } = useContext(Context)
  const Component = components[type]
  if (!Component) return next()

  return (
    <Wrapper
      {...props}
      Component={Component}
      component={type}
      fields={Component.propertyControls}
    />
  )
}

export default (opts = {}) => ({
  queries: {
    hasJSXBlock
  },
  commands: {
    insertJSXBlock,
    setJSXProps
  },
  renderNode: (props, editor, next) => {
    const { node } = props
    if (node.type !== 'jsx-void') return next()
    const type = node.data.get('type')

    return (
      <Node
        {...props}
        next={next}
        editor={editor}
        type={type}
        props={getProps(node)}
      />
    )
  }
})
