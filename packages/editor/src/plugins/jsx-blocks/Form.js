/** @jsx jsx */
// generic block form
import { jsx } from '@emotion/core'
import { useState } from 'react'
import { Flex } from 'theme-ui/layout'

import Label from '../../components/Label'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default ({ fields, value, onSubmit }) => {
  const [state, setState] = useState(value)
  const keys = Object.keys(fields)
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
            {fields[key].title || key}
            <Input
              type="text"
              name={key}
              value={state[key] || ''}
              onChange={e => {
                const format = fields[key].formatValue
                const value =
                  typeof format === 'function'
                    ? format(e.target.value)
                    : e.target.value
                setState({ ...state, [key]: value })
              }}
            />
          </Label>
        ))}
        <Button>Apply</Button>
      </Flex>
    </form>
  )
}
