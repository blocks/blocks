/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import { Textarea } from '@theme-ui/components'
import prettier from 'prettier/standalone'
import parserJS from 'prettier/parser-babylon'
import { Clipboard, Check } from 'react-feather'

import { useCode } from '../providers/code'
import { IconButton } from '../ui'
import useCopyToClipboard from '../use-copy-to-clipboard'
import * as transforms from '../transforms'

import { CanvasWrap } from '../canvas'

export const Copy = ({ toCopy }) => {
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

export const Code = () => {
  const [error, setError] = useState(null)
  const { code, editCode } = useCode()
  const rawCode = transforms.toRawJSX(code)
  const formattedCode = prettier.format(rawCode, {
    parser: 'babel',
    plugins: [parserJS]
  })

  return (
    <CanvasWrap>
      <pre
        sx={{
          mt: 0,
          mb: 0,
          backgroundColor: 'rgba(206, 17, 38, 0.05)',
          fontSize: '8pt'
        }}
      >
        {error}
      </pre>
      <Copy toCopy={formattedCode} />
      <Textarea
        sx={{
          height: '100%',
          border: 'none',
          borderRadius: 0,
          fontFamily: 'Menlo, monospace',
          fontSize: '14px'
        }}
        onChange={e => {
          try {
            editCode(e.target.value)
            setError(null)
          } catch (err) {
            setError(err.toString())
          }
        }}
      >
        {formattedCode}
      </Textarea>
    </CanvasWrap>
  )
}

export default Code
