import React from 'react'
import { Connect, query } from 'urql'

import { AllOrganizations } from '../lib/queries'
import { Box, Container, Heading, Link, ListView, ListViewItem } from './ui'

// TODO: Implement nudge component
// <Nudge top={8}>stuff</Nudge>
export default () => (
  <Connect query={query(AllOrganizations)}>
    {({ loading, data }) => {
      // TODO: Handle this correctly
      if (loading || !data) {
        return <h1>Loading organizations</h1>
      }

      return (
        <Container pt={5}>
          <Heading pb={3}>
            <Box as="span" mr={2} style={{ position: 'relative', top: '2px' }}>
              🗃️
            </Box>
            Organizations
          </Heading>
          <ListView>
            {data.organizations.map(org => (
              <ListViewItem py={3} key={org.id}>
                <Link href={{ pathname: '/org', query: { id: org.id } }}>
                  {org.name}
                </Link>
              </ListViewItem>
            ))}
          </ListView>
        </Container>
      )
    }}
  </Connect>
)
