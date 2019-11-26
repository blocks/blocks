/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import prettier from 'prettier/standalone'
import parserJS from 'prettier/parser-babylon'

import { useEditor } from './editor-context'
import InlineRender from './inline-render'

const Wrap = props => (
  <div
    sx={{
      width: '60%',
      backgroundColor: 'white',
      height: 'calc(100vh - 41px)',
      overflow: 'scroll'
    }}
    {...props}
  />
)

export default ({ code, transformedCode, scope, theme }) => {
  const { mode } = useEditor()

  if (mode === 'code') {
    return (
      <Wrap>
        <Styled.pre
          language="js"
          sx={{
            mt: 0,
            backgroundColor: 'white',
            color: 'black'
          }}
        >
          {prettier.format(code, {
            parser: 'babel',
            plugins: [parserJS]
          })}
        </Styled.pre>
      </Wrap>
    )
  }

  return (
    <Wrap>
      <InlineRender scope={scope} code={transformedCode} theme={theme} />
    </Wrap>
  )
}
