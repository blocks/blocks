/** @jsx jsx */
import { useRef } from 'react'
import { jsx } from 'theme-ui'
import Monaco from '@monaco-editor/react'
import { Clipboard, Check } from 'react-feather'

import useCopyToClipboard from './use-copy-to-clipboard'
import { Loader } from './loader'
import { SegmentedControlButton } from './segmented-control'

const Copy = ({ toCopy }) => {
  const { hasCopied, copyToClipboard } = useCopyToClipboard()

  return (
    <SegmentedControlButton
      label={hasCopied ? 'Copied' : 'Copy'}
      onClick={() => copyToClipboard(toCopy)}
      sx={{
        position: 'absolute',
        right: '10px',
        zIndex: 1,
        cursor: 'pointer',
        svg: {
          fill: hasCopied ? 'green' : null
        }
      }}
      icon={hasCopied ? Check : Clipboard}
    />
  )
}

export const CodeEditor = ({ code, onChange }) => {
  const editorRef = useRef(null)

  const handleEditorDidMount = (_, editor) => {
    editorRef.current = editor

    editorRef.current.onDidChangeModelContent(ev => {
      onChange(editorRef.current.getValue())
    })
  }

  return (
    <div sx={{ height: '100%' }}>
      <Copy toCopy={code} />
      <Monaco
        height="100%"
        value={code}
        language="javascript"
        editorDidMount={handleEditorDidMount}
        theme="light"
        loading={<Loader />}
        options={{
          minimap: {
            enabled: false
          },
          scrollbar: {
            vertical: 'hidden'
          }
        }}
      />
    </div>
  )
}
