import React, { useState } from 'react'
import { Styled } from 'theme-ui'
import { Flex, Box } from 'theme-ui/layout'

import Card from '../../components/Card'
import Label from '../../components/Label'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Form = ({ node, editor }) => {
  const title = node.data.get('title') || ''
  const href = node.data.get('href') || ''
  const onSubmit = data => {
    editor.setNodeByKey(node.key, { data }).deselect()
  }
  const [state, setState] = useState({ title, href })

  return (
    <Card contentEditable={false}>
      <form
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
      <Box fontSize={1} mt={2}>
        Open link:{' '}
        <Styled.a href={state.href} target="_blank">
          {state.href}
        </Styled.a>
      </Box>
    </Card>
  )
}

export default Form
