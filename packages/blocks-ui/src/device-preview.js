/** @jsx jsx */
import { jsx } from 'theme-ui'
import {
  Children,
  cloneElement,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import { ZoomIn, ZoomOut } from 'react-feather'
import { CacheProvider, Global } from '@emotion/core'
import createCache from '@emotion/cache'
import weakMemoize from '@emotion/weak-memoize'

import { IconButton } from './ui'
import { useScrollSync } from './hooks'

const MIN_ZOOM_LEVEL = 25

const createCacheWithContainer = weakMemoize(container =>
  createCache({ container })
)

const Frame = ({ children, setFrame, ...restProps }) => {
  const frameRef = useRef()
  const [[head, body], setNodes] = useState([])
  useLayoutEffect(() => {
    setFrame(frameRef.current)
  })
  useLayoutEffect(() => {
    const { contentDocument } = frameRef.current
    setFrame(frameRef.current)
    setNodes([contentDocument.head, contentDocument.body])
  }, [])
  return (
    <iframe ref={frameRef} title="Device Preview" {...restProps}>
      {body
        ? createPortal(
            <CacheProvider value={createCacheWithContainer(head)}>
              <Global styles={{ body: { margin: 0 } }} />
              {children}
            </CacheProvider>,
            body
          )
        : null}
    </iframe>
  )
}

export const Device = ({ children, width, height, setFrame, zoomLevel }) => {
  width = parseFloat(width)
  height = parseFloat(height)
  return (
    <div
      css={{
        flex: '0 0 auto',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: 16
      }}
    >
      <div
        css={{
          fontSize: 14,
          textAlign: 'left',
          marginBottom: 8,
          color: '#444'
        }}
      >
        {width}px
      </div>
      <div
        style={{
          flex: 1,
          width: width * zoomLevel,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }}
      >
        <Frame
          setFrame={setFrame}
          css={{
            margin: 0,
            border: 0,
            transformOrigin: `top left`
          }}
          style={{
            width: width,
            height: `${(1 / zoomLevel) * 100}%`,
            transform: `scale(${zoomLevel})`
          }}
        >
          {children}
        </Frame>
      </div>
    </div>
  )
}

export function PreviewArea({ children }) {
  const [wrap, setWrap] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const shiftKeyDown = useRef()
  const frames = useRef([])
  const setFrame = index => ref => (frames.current[index] = ref)
  useScrollSync(frames)
  return (
    <div
      css={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        width: '100%',
        height: '100%',
        overflow: 'auto'
      }}
    >
      <div
        css={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: 'minmax(min-content, max-content)',
          gridGap: 8,
          alignItems: 'center',
          padding: 16
        }}
      >
        <input
          type="number"
          min={MIN_ZOOM_LEVEL}
          value={(zoomLevel * 100).toFixed(0)}
          onKeyDown={event => (shiftKeyDown.current = event.shiftKey)}
          onChange={event => {
            const nextZoomLevel = parseFloat(event.target.value) / 100
            const shiftAmount = nextZoomLevel < zoomLevel ? -0.1 : 0.1
            setZoomLevel(
              nextZoomLevel + (shiftKeyDown.current ? shiftAmount : 0)
            )
          }}
          css={{
            appearance: 'none',
            WebkitAppearance: 'none',
            width: 30,
            fontSize: 16,
            border: 'none',
            backgroundColor: 'transparent',
            '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
              WebkitAppearance: 'none',
              margin: 0
            }
          }}
        />
        <span>%</span>
        <IconButton
          aria-label="Zoom viewport out"
          onClick={() => {
            const nextZoomLevel = zoomLevel - 0.1
            if (nextZoomLevel > 0.25) {
              setZoomLevel(nextZoomLevel)
            }
          }}
        >
          <ZoomOut size={15} sx={{ position: 'relative', top: '1px' }} />
        </IconButton>
        <input
          type="range"
          min={MIN_ZOOM_LEVEL}
          max={200}
          value={(zoomLevel * 100).toFixed(0)}
          onChange={event => setZoomLevel(parseFloat(event.target.value) / 100)}
          style={{ width: 80 }}
        />
        <IconButton
          aria-label="Zoom viewport in"
          onClick={() => setZoomLevel(zoomLevel + 0.1)}
        >
          <ZoomIn size={15} sx={{ position: 'relative', top: '1px' }} />
        </IconButton>
        <label
          css={{
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none'
          }}
        >
          <input
            type="checkbox"
            checked={wrap}
            onChange={event => setWrap(event.target.checked)}
          />
          <span style={{ fontSize: 14 }}>wrap</span>
        </label>
      </div>
      <div
        css={{ display: 'flex', overflow: 'auto', backgroundColor: '#f0f0f0' }}
      >
        <div
          css={{
            display: 'flex',
            flexWrap: wrap ? 'wrap' : undefined,
            alignItems: 'start',
            alignContent: 'start',
            height: '100%',
            padding: 16
          }}
        >
          {Children.map(children, (child, index) =>
            cloneElement(child, {
              setFrame: setFrame(index),
              zoomLevel
            })
          )}
        </div>
      </div>
    </div>
  )
}
