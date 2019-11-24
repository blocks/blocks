/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Code, Layers } from 'react-feather'

import { useEditor } from './editor-context'
import { IconButton } from './ui'

export default () => {
  const editorState = useEditor()
  console.log(editorState)

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
      {editorState.mode === 'canvas' ? (
        <IconButton
          aria-label="View code"
          onClick={() => {
            editorState.update({ ...editorState, mode: 'code' })
          }}
        >
          <Code size={15} sx={{ position: 'relative', top: '1px' }} />
        </IconButton>
      ) : (
        <IconButton
          aria-label="View canvas"
          onClick={() => {
            editorState.update({ ...editorState, mode: 'canvas' })
          }}
        >
          <Layers size={15} sx={{ position: 'relative', top: '1px' }} />
        </IconButton>
      )}
    </header>
  )
}
