/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Code, Layers, Monitor, Grid } from 'react-feather'

import { useEditor } from './editor-context'
import { IconButton } from './ui'

function ToggleModeIconButton({ type, label, icon: IconComponent }) {
  const editorState = useEditor()
  return (
    <IconButton
      title={label}
      aria-label={label}
      onClick={() => editorState.update({ ...editorState, mode: type })}
    >
      <IconComponent
        size={15}
        sx={{
          stroke: editorState.mode === type ? '#0079FF' : undefined,
          position: 'relative',
          top: '1px'
        }}
      />
    </IconButton>
  )
}

function ToggleIconButton({ type, label, icon: IconComponent }) {
  const editorState = useEditor()
  const isActive = !!editorState[type]

  return (
    <IconButton
      title={label}
      aria-label={label}
      onClick={() => editorState.update({ ...editorState, [type]: !isActive })}
    >
      <IconComponent
        size={15}
        sx={{
          stroke: isActive ? '#0079FF' : undefined,
          position: 'relative',
          top: '1px'
        }}
      />
    </IconButton>
  )
}

export default () => {
  return (
    <header
      sx={{
        display: 'flex',
        width: '100%',
        py: 2,
        px: 3,
        borderBottom: 'thin solid #e1e6eb'
      }}
    >
      <a href="/" sx={{ mr: 'auto' }}>
        <img
          alt="Blocks logo"
          src="https://user-images.githubusercontent.com/1424573/61592179-e0fda080-ab8c-11e9-9109-166cc7c86b43.png"
          sx={{
            height: 20,
            verticalAlign: 'middle'
          }}
        />
      </a>
      <ToggleIconButton type="xray" label="XRay mode" icon={Grid} />
      <ToggleModeIconButton type="canvas" label="View canvas" icon={Layers} />
      <ToggleModeIconButton
        type="viewports"
        label="View multiple viewports"
        icon={Monitor}
      />
      <ToggleModeIconButton type="code" label="View code" icon={Code} />
    </header>
  )
}
