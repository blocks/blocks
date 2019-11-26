/** @jsx jsx */
import { jsx } from 'theme-ui'
import { createContext, useContext, useRef, useState } from 'react'
import Frame, { FrameContextConsumer } from 'react-frame-component'
import Parser from 'html-react-parser'
import { ZoomIn, ZoomOut } from 'react-feather'

import { IconButton } from './ui'

const MIN_ZOOM_LEVEL = 25

const PreviewAreaContext = createContext()

const VSpacer = ({ size }) => (
  <div css={{ flex: `0 0 ${size}px`, height: '100%' }} />
)

export const Device = ({ children, width, height, name }) => {
  const { zoomLevel } = useContext(PreviewAreaContext)
  const head = Parser(document.head.innerHTML).filter(
    element => typeof element === 'object'
  )
  return (
    <div css={{ flex: '0 0 auto', margin: 16 }}>
      <div css={{ flex: '1 1 auto' }}>
        <div
          css={{
            fontSize: 14,
            textAlign: 'left',
            marginBottom: 8,
            color: '#444'
          }}
        >
          <strong>{name}:</strong> {width}px
        </div>
        <div
          style={{
            width: width * zoomLevel,
            height: height * zoomLevel,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
        >
          <Frame
            head={head}
            css={{
              margin: 0,
              border: 0,
              transformOrigin: `top left`
            }}
            style={{
              width: width,
              height: height,
              transform: `scale(${zoomLevel})`
            }}
          >
            {children}
          </Frame>
        </div>
      </div>
    </div>
  )
}

export function PreviewArea({ children }) {
  const [wrap, setWrap] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const shiftKeyDown = useRef()
  return (
    <div
      css={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        width: '60%',
        height: 'calc(100vh - 41px)',
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
          <PreviewAreaContext.Provider value={{ zoomLevel }}>
            {children}
          </PreviewAreaContext.Provider>
        </div>
      </div>
    </div>
  )
}
