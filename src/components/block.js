/** @jsx jsx */
import React from 'react'
import { Link } from 'gatsby'
import { jsx, Styled } from 'theme-ui'
import * as components from '@theme-ui/components'
import { Global } from '@emotion/core'
import * as blocks from '@blocks/blocks/src'
import InlineRender from 'blocks-ui/dist/inline-render'
import * as controls from 'property-controls'

const { Container } = components

const isComponent = name => /^[A-Z]/.test(name)

const scope = {
  React,
  jsx,
  Styled,
  ...components,
  ...blocks,
  ...controls
}

const PropertyControlsTable = ({ controls, name }) => (
  <Styled.table sx={{ m: 0 }}>
    <Styled.tr>
      <Styled.th sx={{ width: '33%' }}>
        <Styled.code>{name}</Styled.code>
      </Styled.th>
      <Styled.th sx={{ width: '16%' }}>Type</Styled.th>
      <Styled.th sx={{ width: '33%' }}>Default Value</Styled.th>
    </Styled.tr>
    {Object.entries(controls).map(([key, val]) => (
      <Styled.tr key={key}>
        <Styled.td>{val.title || key}</Styled.td>
        <Styled.td>
          <Styled.code>{val.type}</Styled.code>
        </Styled.td>
        <Styled.td>{val.defaultValue || 'None'}</Styled.td>
      </Styled.tr>
    ))}
  </Styled.table>
)

export default ({ block }) => {
  const component = blocks[block.displayName]

  const components = Object.entries(component).reduce((acc, [key, val]) => {
    if (isComponent(key)) {
      const componentName = [block.displayName, key].join('.')
      acc[componentName] = val
    }

    return acc
  }, {})

  return (
    <Styled.root>
      <Global
        styles={{
          '*': {
            boxSizing: 'border-box'
          },
          body: {
            margin: 0
          }
        }}
      />
      <title>{block.displayName} / Blocks UI</title>
      <header
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          py: 2,
          px: 3,
          borderBottom: 'thin solid #e1e6eb'
        }}
      >
        <Link to="/blocks">
          <img
            alt="Blocks logo"
            src="https://user-images.githubusercontent.com/1424573/61592179-e0fda080-ab8c-11e9-9109-166cc7c86b43.png"
            sx={{
              mt: -1,
              height: 24,
              verticalAlign: 'middle',
              mr: 2
            }}
          />
        </Link>
        <Link
          to="/blocks"
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            fontSize: [1, 1, 1],
            lineHeight: 1
          }}
        >
          Blocks
        </Link>
        <span sx={{ px: 1, fontSize: 0 }}>/</span>
        <Styled.h1
          sx={{
            m: 0,
            lineHeight: 1,
            fontWeight: 'body',
            fontSize: [1, 1, 1]
          }}
        >
          {block.displayName}
        </Styled.h1>
      </header>
      <main>
        <section
          sx={{
            mb: [3, 4, 5],
            p: [3, 4, 5],
            borderBottom: 'thin solid #e1e6eb',
            backgroundColor: '#fafafa'
          }}
        >
          <InlineRender
            sx={{
              backgroundColor: 'background'
            }}
            scope={scope}
            code={block.transformed}
          />
        </section>
        <Container>
          <Styled.h3>Property controls</Styled.h3>
          <PropertyControlsTable
            name={block.displayName}
            controls={component.propertyControls}
          />
          {Object.entries(components)
            .filter(([_, val]) => !!val.propertyControls)
            .map(([key, val]) => (
              <PropertyControlsTable
                key={key}
                name={key}
                controls={val.propertyControls}
              />
            ))}
          <Styled.h3 sx={{ mt: [3, 4, 5] }}>Example usage</Styled.h3>
          <Styled.pre>
            {"/** @jsx jsx */\nimport { jsx } from 'theme-ui'\n" +
              `import { ${block.displayName} }  from '@blocks/components'` +
              '\n\n' +
              'export default () => (\n  ' +
              component.usage.trim() +
              '\n)'}
          </Styled.pre>
          <Styled.h3>Source code</Styled.h3>
          <Styled.pre>{block.src}</Styled.pre>
        </Container>
      </main>
    </Styled.root>
  )
}
