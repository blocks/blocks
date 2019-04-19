import React from 'react'

import { serializer, stringifyMDX } from 'blocks-editor/src/lib/mdx-serializer'
import Editor from 'blocks-editor/src/components/Editor'

// These are probably gonna change later
const __DEVELOPER_SAVE = value => {
  const result = stringifyMDX(serializer.serialize(value))
  window.localStorage['lastMDX'] = result
  console.log(result)
}

const initialValue =
  typeof window !== 'undefined' && window.localStorage['lastMDX']

export default () => (
  <div style={{ maxWidth: '48em', margin: '40px auto' }}>
    <Editor
      initialValue={initialValue}
      onChange={({ title, value, emoji }) => {
        __DEVELOPER_SAVE(value)
      }}
    />
  </div>
)
