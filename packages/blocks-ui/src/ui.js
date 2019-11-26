/** @jsx jsx */
import { jsx } from 'theme-ui'

export const IconButton = props => (
  <button
    sx={{
      background: 'none',
      appearance: 'none',
      border: 0,
      px: 2,
      py: 1,
      '&:focus': {
        outline: 'none',
        boxShadow: 'inset 0px 0px 0px 1px #4d9ef7'
      }
    }}
    {...props}
  />
)
