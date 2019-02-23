import React, { Component } from 'react'
import { Connect, query, mutation } from 'urql'
import debounce from 'lodash.debounce'

import {
  Box,
  ClearInput,
  Container,
  Heading,
  Link,
  ListView,
  ListViewItem
} from './ui'

import {
  Organization as Org,
  EditOrganization as EditOrg
} from '../lib/queries'

class Organization extends Component {
  state = { title: '' }

  saveTitle = editOrganization => {
    const { id } = this.props
    const { title } = this.state

    editOrganization({
      organizationId: id,
      name: title
    })
  }

  save = debounce(this.saveTitle, 2000)

  render() {
    const { id } = this.props

    return (
      <Connect
        query={query(Org, { id })}
        mutation={{ editOrg: mutation(EditOrg) }}
      >
        {({ loading, data, editOrg }) => {
          // TODO: Handle this correctly
          if (loading || !data) {
            return <h1>Loading organization</h1>
          }

          const title = this.state.title || data.organization.name || 'Projects'

          return (
            <Container pt={5}>
              <Heading pb={3}>
                <Box
                  as="span"
                  mr={2}
                  style={{ position: 'relative', top: '2px' }}
                >
                  📓
                </Box>
                <ClearInput
                  value={title}
                  onChange={e =>
                    this.setState({ title: e.target.value }, () => {
                      this.save(editOrg)
                    })
                  }
                />
              </Heading>
              <ListView>
                {data.organization.projects.map(project => (
                  <ListViewItem py={3} key={project.id}>
                    <Link
                      href={{ pathname: '/proj', query: { id: project.id } }}
                    >
                      {project.name}
                    </Link>
                  </ListViewItem>
                ))}
              </ListView>
            </Container>
          )
        }}
      </Connect>
    )
  }
}
export default Organization
