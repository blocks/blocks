/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Styled } from 'theme-ui'
import Form from './Form'

export default (props, editor, next) => {
  const { node, attributes, children, isSelected } = props
  if (node.type !== 'link') return next()

  return (
    <span
      css={{
        position: 'relative'
      }}
    >
      <a {...attributes} href={node.data.get('href')}>
        {children}
      </a>
      {isSelected && (
        <div
          css={{
            position: 'absolute',
            zIndex: 1,
            top: '100%',
            left: 0
          }}
        >
          <Form node={node} editor={editor} />
        </div>
      )}
    </span>
  )
}
