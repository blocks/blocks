/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Code, Layers, Monitor, Grid } from 'react-feather'

import { version } from '../package.json'

import { useEditor } from './providers/editor'
import { IconButton } from './ui'

const modes = [
  {
    key: 'canvas',
    Icon: Layers
  },
  {
    key: 'viewports',
    Icon: Monitor
  },
  {
    key: 'code',
    Icon: Code
  }
]

const ToggleXRay = () => {
  const editorState = useEditor()
  const isActive = Boolean(editorState.xray)
  return (
    <ToolbarButton
      label="XRay mode"
      Icon={Grid}
      isActive={isActive}
      onClick={() => editorState.update({ ...editorState, xray: !isActive })}
    />
  )
}

const Modes = () => {
  const editorState = useEditor()
  return (
    <div
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridGap: '1px',
        borderRadius: 4,
        overflow: 'hidden',
        bg: 'border',
        border: '1px solid',
        borderColor: 'border'
      }}
    >
      {modes.map(({ key, Icon }) => (
        <ToolbarButton
          key={key}
          label={`${key} mode`}
          Icon={Icon}
          isActive={editorState.mode === key}
          onClick={() => editorState.update({ ...editorState, mode: key })}
        />
      ))}
    </div>
  )
}

const ToolbarButton = ({ label, onClick, isActive, Icon }) => (
  <IconButton
    title={label}
    aria-label={label}
    onClick={onClick}
    sx={{
      bg: isActive ? 'border' : 'white',
      fill: isActive ? 'primary' : null,
      '&:hover, &:focus': {
        bg: isActive ? null : '#f2f3f5',
        stroke: null
      }
    }}
  >
    <Icon
      size={14}
      sx={{
        stroke: isActive ? 'primary' : undefined,
        position: 'relative',
        top: '1px'
      }}
    />
  </IconButton>
)

const Header = () => (
  <header
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      py: 2,
      px: 3,
      borderBottom: '1px solid',
      borderColor: 'border'
    }}
  >
    <a
      href="https://blocks-ui.com/"
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <img
        src="https://user-images.githubusercontent.com/1424573/61592179-e0fda080-ab8c-11e9-9109-166cc7c86b43.png"
        alt="blocks logo"
        width="32"
        sx={{
          verticalAlign: 'middle',
          ml: '-4px',
          mr: 2
        }}
      />
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
    </a>
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
