/** @jsx jsx */
import { jsx } from 'theme-ui'

const buttonSize = 36
export const buttonIconSize = 16

export const IconButton = ({
  label,
  onClick,
  isActive,
  icon: Icon,
  disabled,
  ...rest
}) => (
  <button
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bg: isActive ? 'highlight' : 'white',
      appearance: 'none',
      border: 0,
      p: 0,
      m: 0,
      height: buttonSize,
      width: buttonSize,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,

      '&:focus': {
        outline: 'none'
      },

      '&:hover, &:focus': {
        bg: isActive || disabled ? null : '#f2f3f5',
        stroke: null
      },

      svg: {
        stroke: isActive ? 'primary' : null
      }
    }}
    aria-label={label}
    onClick={onClick}
    disabled={disabled}
    {...rest}
  >
    <Icon size={buttonIconSize} />
  </button>
)
