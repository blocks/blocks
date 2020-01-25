/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Textarea } from '@theme-ui/components'
import prettier from 'prettier/standalone'
import parserJS from 'prettier/parser-babylon'

import { Clipboard, Check } from 'react-feather'

import * as transforms from './transforms'
import { useEditor } from './providers/editor'
import { useCode } from './providers/code'
import InlineRender from './inline-render'
import { PreviewArea, Device } from './device-preview'
import { IconButton } from './ui'
import useCopyToClipboard from './use-copy-to-clipboard'
import { useScope } from './providers/scope'

const Wrap = props => (
  <div
    sx={{
      position: 'relative',
      backgroundColor: 'white',
      overflow: 'auto'
    }}
    {...props}
  />
)

const Copy = ({ toCopy }) => {
  const { hasCopied, copyToClipboard } = useCopyToClipboard()

  return (
    <IconButton
      onClick={() => copyToClipboard(toCopy)}
      sx={{ position: 'absolute', right: '-4px' }}
    >
      {hasCopied ? (
        <Check sx={{ color: 'green' }} aria-label="Copied" />
      ) : (
        <Clipboard size={16} aria-label="Copy" />
      )}
    </IconButton>
  )
}

const Canvas = () => {
  const { theme, ...scope } = useScope()
  const { code, transformedCode, editCode } = useCode()
  const { mode } = useEditor()
  const rawCode = transforms.toRawJSX(code)
  const formattedCode = prettier.format(rawCode, {
    parser: 'babel',
    plugins: [parserJS]
  })

  if (mode === 'code') {
    return (
      <Wrap>
        <Copy toCopy={formattedCode} />
        <Textarea
          sx={{
            height: '100%',
            border: 'none',
            borderRadius: 0
          }}
          onChange={e => editCode(e.target.value)}
        >
          {formattedCode}
        </Textarea>
      </Wrap>
    )
  }

  if (mode === 'viewports') {
    return (
      <PreviewArea>
        {theme.breakpoints.map(breakpoint => (
          <Device key={breakpoint} width={breakpoint} height={500}>
            <InlineRender scope={scope} code={transformedCode} theme={theme} />
          </Device>
        ))}
      </PreviewArea>
    )
  }

  return (
    <Wrap>
      <InlineRender
        fullHeight
        scope={scope}
        code={transformedCode}
        theme={theme}
      />
    </Wrap>
  )
}

export default Canvas
