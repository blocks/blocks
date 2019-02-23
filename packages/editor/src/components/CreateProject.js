import React from 'react'
import { Connect, mutation } from 'urql'

import { redirect } from '../lib/util'
import { CreateProject } from '../lib/queries'

import { Container, Heading, Input, Button } from './ui'

export default ({ name, emoji = '', organizationId, onChange }) => (
  <Connect
    mutation={{
      createProject: mutation(CreateProject)
    }}
  >
    {({ createProject }) => (
      <Container pt={5}>
        <Heading mb={3}>Create a project</Heading>
        <Input value={name} onChange={onChange} />
        <Button
          as="input"
          ml={2}
          defaultValue="Add"
          type="submit"
          onClick={async () => {
            const {
              createProject: { project }
            } = await createProject({ name, emoji, organizationId })
            redirect(`/proj?id=${project.id}`)
          }}
        />
      </Container>
    )}
  </Connect>
)
