import React, { useState } from 'react'
import { Styled } from 'theme-ui'
import { Flex, Box } from 'theme-ui/layout'
import Tooltip from '../../tooltip'

import Label from '../toolbar/Label'
import Input from '../toolbar/Input'
import Button from '../toolbar/Button'

const Form = ({ title = '', href = '', onSubmit }) => {
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
        <Flex alignItems="flex-end">
          <Label mr={2}>
            URL
            <Input
              type="text"
              name="href"
              value={state.href}
              onChange={e => {
                setState({ ...state, href: e.target.value })
              }}
            />
          </Label>
          <Label mr={2}>
            Title
            <Input
              type="text"
              name="title"
              value={state.title}
              onChange={e => {
                setState({ ...state, title: e.target.value })
              }}
            />
          </Label>
          <Button>Apply</Button>
        </Flex>
      </form>
      <Box my={2}>
        Open link:{' '}
        <Styled.a href={state.href} target="_blank">
          {state.href}
        </Styled.a>
      </Box>
    </div>
  )
}

const LinkTooltip = props => {
  const { editor } = props
  const mark = editor.value.inlines.first()
  if (!mark) return false
  return (
    <Tooltip type="link" {...props}>
      <Form
        href={mark.data.get('href')}
        title={mark.data.get('title')}
        onSubmit={data => {
          editor.setNodeByKey(mark.key, { data }).deselect()
        }}
      />
    </Tooltip>
  )
}

export default (props, editor, next) => {
  const children = next()

  return (
    <>
      {children}
      <LinkTooltip editor={editor} />
    </>
  )
}
