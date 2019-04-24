/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Styled } from 'theme-ui'

export default ({ attributes, node, editor, onChange, ...props }) => {
  const src = node.data.get('src')

  if (!src) {
    return (
      <div
        {...attributes}
        style={{
          width: 256,
          height: 256,
          backgroundColor: 'gray',
          outline: props.isFocused ? '2px solid blue' : null
        }}
      />
    )
  }

  return (
    <Styled.img
      {...attributes}
      src={src}
      style={{
        outline: props.isFocused ? '2px solid blue' : null
      }}
    />
  )
}
