import React, { useState } from 'react'
import { Flex } from 'theme-ui/layout'
import Label from './Label'
import Input from './Input'
import Button from './Button'

export default ({ src = '', alt = '', onSubmit }) => {
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
