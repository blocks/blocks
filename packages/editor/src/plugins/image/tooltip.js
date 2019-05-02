import React, { useState } from 'react'
import { Flex } from 'theme-ui/layout'
import Tooltip from '../../tooltip'

import Label from '../../components/Label'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Form = ({ src = '', alt = '', onSubmit }) => {
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
      <Flex flexWrap="wrap" alignItems="flex-end">
        <Label mr={2}>
          Image URL
          <Input
            type="text"
            name="url"
            value={state.src}
            onChange={e => {
              setState({ ...state, src: e.target.value })
            }}
          />
        </Label>
        <Label mr={2}>
          Alt text
          <Input
            type="text"
            name="alt"
            value={state.alt}
            onChange={e => {
              setState({ ...state, alt: e.target.value })
            }}
          />
        </Label>
        <Button>Save</Button>
      </Flex>
    </form>
  )
}

export default props => {
  const { editor } = props
  const node = editor.value.focusBlock
  if (!node) return false
  return (
    <Tooltip {...props}>
      <Form
        src={node.data.get('src')}
        alt={node.data.get('alt')}
        onSubmit={data => {
          editor.setNodeByKey(node.key, { data }).deselect()
        }}
      />
    </Tooltip>
  )
}
