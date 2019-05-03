/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import Gist from 'react-gist'
import { Flex } from 'theme-ui/layout'

import Overlay from './Overlay'
import Card from '../../components/Card'
import Label from '../../components/Label'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Form = ({ value, onSubmit }) => {
  const [state, setState] = useState({ id: value.id || '' })
  return (
    <Card
      css={{
        marginBottom: 8
      }}
    >
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
            Gist ID:
            <Input
              type="text"
              name="id"
              value={state.id}
              onChange={e => {
                setState({ ...state, id: e.target.value })
              }}
            />
          </Label>
          <Button>Apply</Button>
        </Flex>
      </form>
    </Card>
  )
}

export default ({ editor, node, attributes, props, isSelected }) => {
  return (
    <div>
      <div
        {...attributes}
        style={{
          position: 'relative',
          outline: isSelected ? '2px solid blue' : null
        }}
      >
        {props.id ? (
          <div style={{ marginLeft: -8, marginRight: -8 }}>
            <Gist {...props} />
          </div>
        ) : (
          <pre>Enter a Gist ID</pre>
        )}
        {!isSelected && <Overlay />}
      </div>
      {isSelected && (
        <Form
          value={props}
          onSubmit={next => {
            editor.setJSXProps({
              type: 'Gist',
              props: next
            })
          }}
        />
      )}
    </div>
  )
}
