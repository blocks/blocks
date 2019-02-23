import React from 'react'
import { Connect, mutation } from 'urql'

import { redirect } from '../lib/util'
import { CreateDocument } from '../lib/queries'

import { Container, Heading, Input, Button } from './ui'

export default ({ name, emoji = '', projectId, onChange }) => (
  <Connect
    mutation={{
      createDocument: mutation(CreateDocument)
    }}
  >
    {({ createDocument }) => (
      <Container pt={5}>
        <Heading mb={3}>Create a document</Heading>
        <Input value={name} onChange={onChange} />
        <Button
          as="input"
          ml={2}
          defaultValue="Add"
          type="submit"
          onClick={async () => {
            const {
              createDocument: { document }
            } = await createDocument({ name, emoji, projectId })
            redirect(`/doc?id=${document.id}`)
          }}
        />
      </Container>
    )}
  </Connect>
)
