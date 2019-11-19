/** @jsx jsx */
import React from 'react'
import { jsx, Styled } from 'theme-ui'
import * as components from '@theme-ui/components'
import * as blocks from '@blocks/blocks'
import InlineRender from 'blocks-ui/dist/inline-render'
import * as controls from 'property-controls'

const { Container } = components

const isComponent = name => /^[A-Z]/.test(name)

const scope = {
  React,
  jsx,
  Styled,
  ...components,
  ...controls
}

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
      <title>Blocks UI</title>
      <main>
        <Container>
          <Styled.h2 as="h1">{block.displayName}</Styled.h2>
        </Container>
        <section
          sx={{
            my: 4,
            borderTop: 'thin solid #e1e6eb',
            borderBottom: 'thin solid #e1e6eb'
          }}
        >
          <InlineRender scope={scope} code={block.transformedSrc} />
        </section>
        <Container>
          <Styled.h3>Property controls</Styled.h3>
          <Styled.h4>Root</Styled.h4>
          <Styled.pre>
            {JSON.stringify(component.propertyControls, null, 2)}
          </Styled.pre>
          {Object.entries(components)
            .filter(([_, val]) => !!val.propertyControls)
            .map(([key, val]) => (
              <div key={key}>
                <Styled.h4>{key}</Styled.h4>
                <Styled.pre>
                  {JSON.stringify(val.propertyControls, null, 2)}
                </Styled.pre>
              </div>
            ))}
          <Styled.h3>Example usage</Styled.h3>
          <Styled.pre>{block.usage}</Styled.pre>
          <Styled.h3>Source code</Styled.h3>
          <Styled.pre>{block.src}</Styled.pre>
        </Container>
      </main>
    </Styled.root>
  )
}
