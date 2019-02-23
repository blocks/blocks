import React from 'react'
import { Connect, mutation } from 'urql'

import { DeleteDocument } from '../lib/queries'
import { Button, Icon } from './ui'

export default ({ id }) => (
  <Connect
    mutation={{
      deleteDocument: mutation(DeleteDocument)
    }}
  >
    {({ deleteDocument }) => (
      <Button bg="reds.4" px={2} py={1} onClick={() => deleteDocument({ id })}>
        <Icon
          name="trash"
          size={15}
          color="white"
          style={{ position: 'relative', top: '1px' }}
        />
      </Button>
    )}
  </Connect>
)
