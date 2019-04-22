/** @jsx jsx */
import { jsx } from '@emotion/core'

export default props => (
  <div
    {...props}
    css={{
      display: 'flex',
      padding: 8,
      backgroundColor: '#eee'
    }}
  />
)
