/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { Code, Layers, Monitor, Grid } from 'react-feather'

import pkg from '../package.json'

import { useEditor } from './providers/editor'
import { SegmentedControl } from './segmented-control'
import { IconButton } from './ui'

const { version } = pkg

export const headerHeight = 60

const MODES = [
  {
    key: 'canvas',
    label: 'Canvas Mode',
    icon: Layers
  },
  {
    key: 'viewports',
    label: 'Viewports Mode',
    icon: Monitor
  },
  {
    key: 'code',
    label: 'Code Mode',
    icon: Code
  }
]

const ToggleXRay = () => {
  const editorState = useEditor()
  const isActive = Boolean(editorState.xray)
  return (
    <IconButton
      label="XRay mode"
      icon={Grid}
      isActive={isActive}
      onClick={() => editorState.update({ ...editorState, xray: !isActive })}
      disabled={editorState.mode === MODES[2].key}
    />
  )
}

const Modes = () => {
  const editorState = useEditor()
  const [activeModeIndex, setActiveModeIndex] = useState(0)

  return (
    <SegmentedControl
      options={MODES}
      activeIndex={activeModeIndex}
      onChange={(option, index) => {
        editorState.update({ ...editorState, mode: option.key })
        setActiveModeIndex(index)
      }}
    />
  )
}

const Header = () => (
  <header
    sx={{
      height: headerHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 3,
      borderBottom: '1px solid',
      borderColor: 'border'
    }}
  >
    <Logo />
    <div
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridGap: 3
      }}
    >
      <ToggleXRay />
      <Modes />
    </div>
  </header>
)

export default Header

const Logo = () => (
  <a
    href="/"
    sx={{
      display: 'grid',
      gridAutoFlow: 'column',
      alignItems: 'center',
      gridGap: 2,
      textDecoration: 'none',
      color: 'inherit',
      ml: '-4px'
    }}
  >
    <img
      src="https://user-images.githubusercontent.com/1424573/61592179-e0fda080-ab8c-11e9-9109-166cc7c86b43.png"
      alt="blocks logo"
      width="38"
    />
    <div
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'baseline',
        gridGap: 2
      }}
    >
      Blocks
      <span
        sx={{
          fontSize: 0,
          mt: '2px',
          ml: 2
        }}
      >
        v{version}
      </span>
    </div>
  </a>
)
