/** @jsx jsx */
import { jsx } from 'theme-ui'

export const buttonSize = 36

export const IconButton = props => (
  <button
    sx={{
      background: 'none',
      appearance: 'none',
      border: 0,
      p: 0,
      m: 0,
      height: buttonSize,
      width: buttonSize,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '&:focus': {
        outline: 'none'
      }
    }}
    {...props}
  />
)
