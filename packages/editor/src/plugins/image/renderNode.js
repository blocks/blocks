/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Styled } from 'theme-ui'
import Form from './Form'

const Image = ({ attributes, node, editor, isSelected }) => {
  const src = node.data.get('src')

  if (!src) {
    return (
      <div
        {...attributes}
        style={{
          width: 256,
          height: 256,
          backgroundColor: 'gray',
          outline: isSelected ? '2px solid blue' : null
        }}
      />
    )
  }

  return (
    <Styled.img
      {...attributes}
      src={src}
      style={{
        outline: isSelected ? '2px solid blue' : null
      }}
    />
  )
}

export default (props, editor, next) => {
  const { node, attributes, isSelected } = props
  if (node.type !== 'image') return next()
  return (
    <div>
      <Image {...props} {...attributes} node={node} editor={editor} />
      {isSelected && <Form node={node} editor={editor} />}
    </div>
  )
}
