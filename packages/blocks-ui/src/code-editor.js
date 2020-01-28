/** @jsx jsx */
import { useRef } from 'react'
import { jsx } from 'theme-ui'
import { Textarea } from '@theme-ui/components'
import Monaco from '@monaco-editor/react'

const CodeEditor = ({ code, onChange }) => {
  const editorRef = useRef(null)

  const handleEditorDidMount = (_, editor) => {
    editorRef.current = editor

    editorRef.current.onDidChangeModelContent(ev => {
      onChange(editorRef.current.getValue())
    })
  }

  return (
    <Monaco
      height="100%"
      value={code}
      language="javascript"
      editorDidMount={handleEditorDidMount}
      options={{
        minimap: {
          enabled: false
        }
      }}
    />
  )
}

export default CodeEditor

/*
    <Textarea
      sx={{
        height: '100%',
        border: 'none',
        borderRadius: 0,
        fontFamily: 'Menlo, monospace',
        fontSize: '14px'
      }}
      onChange={e => {
        onChange(e.target.value)
      }}
    >
      {code}
    </Textarea>
*/
