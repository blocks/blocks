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
            padding: 8,
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'white'
          }}
        >
          <Form node={node} editor={editor} />
        </div>
      )}
    </span>
  )
}
