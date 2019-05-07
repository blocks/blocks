/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { Data } from 'slate'
import { Context } from '../../components/context'

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

const insertJSXBlock = (editor, type, props, component) => {
  const { isVoid } = component.propertyControls

  if (isVoid) {
    editor.insertBlock({
      type: 'jsx-void',
      data: {
        type,
        props: Data.create(props)
      }
    })
  } else {
    editor.wrapBlock({
      type: 'jsx',
      data: {
        type,
        props: Data.create(props)
      }
    })
  }
}

const getProps = node => {
  const map = node.data.get('props')
  if (typeof map.toJS !== 'function') return map
  return map.toJS()
}

const Node = ({ type, next, ...props }) => {
  const { components } = useContext(Context)
  const Component = components[type]
  if (!Component) return next()

  return <Component {...props} />
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
    const isJSXNode = node.type === 'jsx' || node.type === 'jsx-void'
    if (!isJSXNode) return next()
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
