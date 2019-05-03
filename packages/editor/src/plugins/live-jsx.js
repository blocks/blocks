/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { LiveProvider, LivePreview, LiveContext } from 'react-live'
import ErrorIcon from '@material-ui/icons/ErrorOutline'
import { Context as ThemeContext, css } from 'theme-ui'
import { Flex } from 'theme-ui/layout'
import omit from 'lodash.omit'

const Pre = props => (
  <pre
    {...props}
    css={css({
      bg: 'lightgray',
      p: 3,
      fontFamily: 'monospace'
    })}
  />
)

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

const LiveJSX = ({ code, attributes, children }) => {
  const theme = useContext(ThemeContext)
  const scope = {
    ...omit(theme.components, omitComponents)
  }
  return (
    <div>
      <LiveProvider scope={scope} transformCode={transform} code={code}>
        <LivePreview />
        <Flex
          alignItems="center"
          css={{
            width: '100%'
          }}
        >
          <Pre
            {...attributes}
            css={css({
              width: '100%'
            })}
          >
            {children}
          </Pre>
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

const toggleJSX = editor => editor.toggleBlock('jsx')

export default (opts = {}) => ({
  commands: {
    toggleJSX
  },
  renderNode: (props, editor, next) => {
    const { node, attributes, children } = props
    if (node.type !== 'jsx') return next()

    return (
      <LiveJSX
        attributes={attributes}
        code={node.getText()}
        children={children}
      />
    )
  }
})
