/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import { Flex } from 'theme-ui/layout'

import Label from '../../components/Label'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default ({ value, onSubmit }) => {
  const [state, setState] = useState(value)
  const keys = Object.keys(state)
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
        {keys.map(key => (
          <Label key={key} mr={2}>
            {key}
            <Input
              type="text"
              name={key}
              value={state[key] || ''}
              onChange={e => {
                setState({ ...state, [key]: e.target.value })
              }}
            />
          </Label>
        ))}
        <Button>Apply</Button>
      </Flex>
    </form>
  )
}
