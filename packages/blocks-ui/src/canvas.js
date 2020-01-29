/** @jsx jsx */
import { useRef, useEffect } from 'react'
import { jsx } from 'theme-ui'
import Loadable from 'react-loadable'
import { Loader } from 'react-feather'

import { useEditor } from './providers/editor'
import { useCanvas } from './providers/canvas'
import { useElementSize } from './use-element-size'

const FallbackLoader = () => (
  <div
    sx={{
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Loader />
  </div>
)

const CodeMode = Loadable({
  loader: () => import('./modes/code'),
  loading: FallbackLoader
})

const ViewportsMode = Loadable({
  loader: () => import('./modes/viewports'),
  loading: FallbackLoader
})

const CanvasMode = Loadable({
  loader: () => import('./modes/canvas'),
  loading: FallbackLoader
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
  if (mode === 'code') return <CodeMode />
  if (mode === 'viewports') return <ViewportsMode />
  if (mode === 'canvas') return <CanvasMode />
  return null
}
