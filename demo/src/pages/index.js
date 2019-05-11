/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as Rebass from '@rebass/emotion'

import { Editor, serializer, stringifyMDX } from '@blocks/editor/src'

// These are probably gonna change later
const __DEVELOPER_SAVE = value => {
  const result = stringifyMDX(serializer.serialize(value))
  window.localStorage['lastMDX'] = result
  console.log(result)
}

const initialValue =
  typeof window !== 'undefined'
    ? window.localStorage['lastMDX']
    : '# Blocks\n\nBlocks turns your MDX into WYSIWYG\n supports all **md formattings**\n\n## And even YouTube:\n\n<YouTube videoId="d2sQiI5NFAM" />'

export default () => (
  <div
    css={{
      maxWidth: '48em',
      padding: 32,
      marginLeft: 'auto',
      marginRight: 'auto'
    }}
  >
    <Editor
      initialValue={initialValue}
      onChange={({ title, value, emoji }) => {
        __DEVELOPER_SAVE(value)
      }}
      components={{
        ...Rebass
      }}
    />
  </div>
)
