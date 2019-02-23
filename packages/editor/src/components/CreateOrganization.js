import React from 'react'
import { Connect, mutation } from 'urql'

import { redirect } from '../lib/util'
import { CreateOrganization } from '../lib/queries'

import { Container, Heading, Input, Button } from './ui'

export default ({ name, onChange }) => (
  <Connect
    mutation={{
      createOrganization: mutation(CreateOrganization)
    }}
  >
    {({ createOrganization }) => (
      <Container pt={5}>
        <Heading mb={3}>Create an organization</Heading>
        <Input value={name} onChange={onChange} />
        <Button
          as="input"
          ml={2}
          defaultValue="Add"
          type="submit"
          onClick={async () => {
            const {
              createOrganization: { organization }
            } = await createOrganization({ name })
            redirect(`/org?id=${organization.id}`)
          }}
        />
      </Container>
    )}
  </Connect>
)
