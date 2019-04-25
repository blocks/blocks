/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { LiveProvider, LivePreview, LiveContext } from 'react-live'
import ErrorIcon from '@material-ui/icons/ErrorOutline'
import { Context as ThemeContext, css } from 'theme-ui'
import { Flex } from 'theme-ui/layout'
import omit from 'lodash.omit'
import CodeBlock from '../components/CodeBlock'

const omitComponents = ['delete']

const ErrorMessage = props => {
  const context = useContext(LiveContext)
  return (
    <div {...props} title={context.error}>
      <ErrorIcon
        style={{
          color: !!context.error ? 'red' : 'gray'
        }}
      />
    </div>
  )
}

const transform = code => `<>${code}</>`

const LiveJSX = ({ code, attributes, children, metadata }) => {
  const theme = useContext(ThemeContext)
  const scope = {
    ...omit(theme.components, omitComponents)
  }
  const { name, props = {} } = metadata
  return (
    <div>
      <LiveProvider scope={scope} transformCode={transform} code={code}>
        <LivePreview />
        <pre>
          name: {name} | props: {Object.keys(props).join()}
        </pre>
        <Flex
          alignItems="center"
          css={{
            width: '100%'
          }}
        >
          <CodeBlock
            {...attributes}
            css={css({
              width: '100%'
            })}
          >
            {children}
          </CodeBlock>
          <ErrorMessage
            css={css({
              ml: -32
            })}
          />
        </Flex>
      </LiveProvider>
    </div>
  )
}

export default (opts = {}) => ({
  renderNode: (props, editor, next) => {
    const { node, attributes, children } = props
    if (node.type !== 'jsx') return next()

    const metadata = node.data.toJS()

    return (
      <LiveJSX
        attributes={attributes}
        code={node.getText()}
        children={children}
        metadata={metadata}
      />
    )
  }
  // onChange: (change, next) => {
  // todo: parse new props from jsx string
  // console.log(change.value.toJS())
  // }
})
