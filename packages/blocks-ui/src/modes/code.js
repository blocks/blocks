/** @jsx jsx */
import { useState, useEffect } from 'react'
import { jsx } from 'theme-ui'
import prettier from 'prettier/standalone'
import parserJS from 'prettier/parser-babel'

import * as transforms from '../transforms'
import { useCode } from '../providers/code'
import { CanvasWrap } from '../canvas'
import { CodeEditor } from '../code-editor'

const CodeMode = () => {
  const { code, editCode } = useCode()
  const [formattedCode, setFormattedCode] = useState('')

  useEffect(() => {
    const rawCode = transforms.toRawJSX(code)
    setFormattedCode(
      prettier.format(rawCode, {
        parser: 'babel',
        plugins: [parserJS]
      })
    )
  }, [])

  const onCodeChange = (code) => {
    try {
      editCode(code)
    } catch (e) {
      // do nothing as the errors are displayed in the editor
    }
  }

  return (
    <CanvasWrap>
      <CodeEditor code={formattedCode} onChange={onCodeChange} />
    </CanvasWrap>
  )
}

export default CodeMode
