import React, { Component } from 'react'
import { Connect, query, mutation } from 'urql'
import { Flex, Box, Code } from 'unified-ui'
import debounce from 'lodash.debounce'

import toMDX from '../lib/slate-schema-to-mdx'
import { Document, EditDocument } from '../lib/queries'
import Editor from './Editor'

export default class Doc extends Component {
  state = { title: '', value: '' }

  saveDocument = editDocument => {
    const { id } = this.props
    const { title, value, emoji } = this.state

    editDocument({
      emoji,
      documentId: id,
      name: title,
      content: JSON.stringify(value.toJSON())
    })
  }

  save = debounce(this.saveDocument, 2000)

  render() {
    const { id } = this.props

    return (
      <Connect
        query={query(Document, { id })}
        mutation={{
          editDocument: mutation(EditDocument)
        }}
      >
        {({ loading, data, editDocument }) => {
          // TODO: Handle this correctly
          if (loading || !data) {
            return <h1>Loading document</h1>
          }

          const content = this.state.value || JSON.parse(data.document.content)
          const title = this.state.title || data.document.name
          const emoji = this.state.emoji || data.document.emoji

          const debug = localStorage && localStorage.getItem('DEBUG')

          return (
            <Flex>
              <Box width={debug ? 4 / 5 : 1} flex="1 1 auto">
                <Editor
                  title={title}
                  value={content}
                  emoji={emoji}
                  onChange={({ title, value, emoji }) => {
                    this.setState({ title, value, emoji }, () =>
                      this.save(editDocument)
                    )
                  }}
                />
              </Box>
              {debug ? (
                <Box px={3} style={{ borderLeft: 'thin solid #eee' }}>
                  <Code as="pre" bg="white">
                    {toMDX(content)}
                  </Code>
                </Box>
              ) : null}
            </Flex>
          )
        }}
      </Connect>
    )
  }
}
