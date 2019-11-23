/** @jsx jsx */
import { jsx } from 'theme-ui'

export const IconButton = props => (
  <button
    sx={{
      appearance: 'none',
      border: 0,
      px: 2,
      py: 1
    }}
    {...props}
  />
)
