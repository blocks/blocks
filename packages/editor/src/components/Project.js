import React, { Component } from 'react'
import { Connect, query, mutation } from 'urql'
import debounce from 'lodash.debounce'

import { Project as Proj, EditProject as EditProj } from '../lib/queries'
import DeleteDocument from './DeleteDocument'

import {
  Flex,
  Box,
  ClearInput,
  Container,
  Heading,
  Link,
  ListView,
  ListViewItem
} from './ui'

class Project extends Component {
  state = { title: '' }

  saveTitle = editProject => {
    const { id } = this.props
    const { title } = this.state

    editProject({
      projectId: id,
      name: title
    })
  }

  save = debounce(this.saveTitle, 2000)

  render() {
    const { id } = this.props

    return (
      <Connect
        query={query(Proj, { id })}
        mutation={{ editProj: mutation(EditProj) }}
      >
        {({ loading, data, editProj }) => {
          // TODO: Handle this correctly
          if (loading || !data) {
            return <h1>Loading project</h1>
          }

          const title = this.state.title || data.project.name

          return (
            <Container pt={5}>
              <Heading pb={3}>
                <Box
                  as="span"
                  mr={2}
                  style={{ position: 'relative', top: '2px' }}
                >
                  📝
                </Box>
                <ClearInput
                  value={title}
                  onChange={e =>
                    this.setState({ title: e.target.value }, () => {
                      this.save(editProj)
                    })
                  }
                />
              </Heading>
              <ListView>
                {data.project.documents.map(document => (
                  <ListViewItem py={3} key={document.id}>
                    <Flex width={1} justifyContent="space-between">
                      <Link
                        href={{ pathname: '/doc', query: { id: document.id } }}
                      >
                        <a>{document.name || 'Untitled'}</a>
                      </Link>
                      <DeleteDocument id={document.id} />
                    </Flex>
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
export default Project
