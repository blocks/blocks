/** @jsx jsx */
import { lazy, useRef, useEffect } from 'react'
import { jsx } from 'theme-ui'

import { useEditor } from './providers/editor'
import { useCanvas } from './providers/canvas'
import { useElementSize } from './use-element-size'

const CodeMode = lazy(() => import('./modes/code'))
const ViewportsMode = lazy(() => import('./modes/viewports'))
const CanvasMode = lazy(() => import('./modes/canvas'))

export const CanvasWrap = props => {
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

export const Canvas = () => {
  const { mode } = useEditor()
  if (mode === 'code') return <CodeMode />
  if (mode === 'viewports') return <ViewportsMode />
  if (mode === 'canvas') return <CanvasMode />
  return null
}
