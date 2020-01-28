/** @jsx jsx */
import { useState, useRef, useEffect } from 'react'
import { jsx } from 'theme-ui'
import prettier from 'prettier/standalone'
import parserJS from 'prettier/parser-babylon'

import CodeEditor from './code-editor'

import * as transforms from './transforms'
import { useEditor } from './providers/editor'
import { useCode } from './providers/code'
import InlineRender from './inline-render'
import { PreviewArea, Device } from './device-preview'
import { useScope } from './providers/scope'
import { useCanvas } from './providers/canvas'
import { useElementSize } from './use-element-size'

const CanvasWrap = props => {
  const canvasRef = useRef()
  const elementSize = useElementSize(canvasRef)
  const { setCanvasSize } = useCanvas()

  useEffect(() => {
    setCanvasSize(elementSize)
  }, [elementSize])

  return (
    <div
      ref={canvasRef}
      sx={{
        position: 'relative',
        backgroundColor: 'white',
        overflow: 'auto'
      }}
      {...props}
    />
  )
}

const Canvas = () => {
  const { theme, ...scope } = useScope()
  const { code, transformedCode, editCode } = useCode()
  const { mode } = useEditor()

  const [formattedCode, setFormattedCode] = useState('')

  useEffect(() => {
    if (mode === 'code') {
      const rawCode = transforms.toRawJSX(code)
      setFormattedCode(
        prettier.format(rawCode, {
          parser: 'babel',
          plugins: [parserJS]
        })
      )
    }
  }, [mode])

  const onCodeChange = code => {
    try {
      editCode(code)
    } catch (e) {
      // do nothing as they are displayed in the editor
    }
  }

  if (mode === 'code') {
    return (
      <CanvasWrap>
        <CodeEditor code={formattedCode} onChange={onCodeChange} />
      </CanvasWrap>
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
    <CanvasWrap>
      <InlineRender
        fullHeight
        scope={scope}
        code={transformedCode}
        theme={theme}
      />
    </CanvasWrap>
  )
}

export default Canvas
