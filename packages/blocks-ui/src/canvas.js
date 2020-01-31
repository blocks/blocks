/** @jsx jsx */
import { useRef, useEffect } from 'react'
import { jsx } from 'theme-ui'
import Loadable from 'react-loadable'

import { Loader } from './loader'

import { useEditor } from './providers/editor'
import { useCanvas } from './providers/canvas'
import { useElementSize } from './use-element-size'

const CodeMode = Loadable({
  loader: () => import('./modes/code'),
  loading: Loader
})

const ViewportsMode = Loadable({
  loader: () => import('./modes/viewports'),
  loading: Loader
})

const CanvasMode = Loadable({
  loader: () => import('./modes/canvas'),
  loading: Loader
})

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
  switch (mode) {
    case 'code':
      return <CodeMode />
    case 'viewports':
      return <ViewportsMode />
    case 'canvas':
      return <CanvasMode />
    default:
      return null
  }
}
