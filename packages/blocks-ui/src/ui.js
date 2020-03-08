/** @jsx jsx */
import { jsx } from 'theme-ui'

const buttonSize = 36
export const buttonIconSize = 16

const Glyph = ({ glyph }) => {
  switch (glyph) {
    case 'fullscreen':
      return (
        <path d="M1.5 5.5V2.5C1.5 1.94772 1.94772 1.5 2.5 1.5H5.5M10.5 1.5H13.5C14.0523 1.5 14.5 1.94772 14.5 2.5V5.5M14.5 10.5V13.5C14.5 14.0523 14.0523 14.5 13.5 14.5H10.75M5.5 14.5H2.5C1.94772 14.5 1.5 14.0523 1.5 13.5V10.5" />
      )
    case 'viewports':
      return (
        <path d="M4.5 4.5V2.5C4.5 1.94772 4.94772 1.5 5.5 1.5H13.5C14.0523 1.5 14.5 1.94772 14.5 2.5V13.5C14.5 14.0523 14.0523 14.5 13.5 14.5H9.5M6.5 14.5H3.5C2.94772 14.5 2.5 14.0523 2.5 13.5V7.5C2.5 6.94772 2.94772 6.5 3.5 6.5H6.5C7.05228 6.5 7.5 6.94772 7.5 7.5V13.5C7.5 14.0523 7.05228 14.5 6.5 14.5Z" />
      )
    case 'code':
      return <path d="M5.5 3.5L1 8L5.5 12.5M10.5 12.5L15 8L10.5 3.5" />
    case 'plus':
      return <path d="M7.5 2.5V12.5M12.5 7.5H2.5" />
    case 'minus':
      return <path d="M12.5 7.5H2.5" />
    case 'arrow-left-up':
      return (
        <path d="M6.5 2L3 5.5M6.5 2L10 5.5M6.5 2V12.5C6.5 13.0523 6.94772 13.5 7.5 13.5H13.5" />
      )
    case 'grid':
      return (
        <path d="M5.5 5.5H10.5M5.5 5.5V10.5M5.5 5.5V0.5M5.5 5.5H0.5M10.5 5.5V10.5M10.5 5.5H15.5M10.5 5.5V0.5M10.5 10.5H5.5M10.5 10.5V15.5M10.5 10.5H15.5M5.5 10.5H0.5M5.5 10.5V15.5M5.5 0.5H10.5M5.5 0.5H1.5C0.947715 0.5 0.5 0.947715 0.5 1.5V5.5M0.5 5.5V10.5M0.5 10.5V14.5C0.5 15.0523 0.947715 15.5 1.5 15.5H5.5M5.5 15.5H10.5M10.5 15.5H14.5C15.0523 15.5 15.5 15.0523 15.5 14.5V10.5M15.5 10.5V5.5M15.5 5.5V1.5C15.5 0.947715 15.0523 0.5 14.5 0.5H10.5" />
      )
    case 'duplicate':
      return (
        <path d="M10.5 3.49999V2.5C10.5 1.94772 10.0523 1.5 9.5 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V9.49999C1.5 10.0523 1.94772 10.5 2.50001 10.5L3.5 10.5M14.5 6.49999V13.5C14.5 14.0523 14.0523 14.5 13.5 14.5H6.5C5.94772 14.5 5.5 14.0523 5.5 13.5V6.49999C5.5 5.9477 5.94771 5.49999 6.5 5.49999H13.5C14.0523 5.49999 14.5 5.9477 14.5 6.49999Z" />
      )
    case 'trash':
      return (
        <path d="M2.5 3.5H5.5M13.5 3.5H10.5M5.5 3.5V2.5C5.5 1.94772 5.94772 1.5 6.5 1.5H9.5C10.0523 1.5 10.5 1.94772 10.5 2.5V3.5M5.5 3.5H10.5M3.5 5.5V13.5C3.5 14.0523 3.94772 14.5 4.5 14.5H11.5C12.0523 14.5 12.5 14.0523 12.5 13.5V5.5M6.5 6.5V11.5M9.5 6.5V11.5" />
      )
    case 'clippy':
      return (
        <path d="M3.52 2.5H3.5C2.94771 2.5 2.5 2.94772 2.5 3.5V13.5C2.5 14.0523 2.94771 14.5 3.5 14.5H12.5C13.0523 14.5 13.5 14.0523 13.5 13.5V3.5C13.5 2.94772 13.0523 2.5 12.5 2.5H12.3M5.5 1.5V4.5H10.5V1.5H5.5Z" />
      )
    case 'all':
      return <path d="M1.5 4.5V11.5M4.5 1.5H11.5M14.5 4.5V11.5M11.5 14.5H4.5" />
    case 'axis':
      return (
        <path d="M1.5 4.5V8M1.5 11.5V8M4.5 1.5H8M11.5 1.5H8M14.5 4.5V8M14.5 11.5V8M11.5 14.5H8M4.5 14.5H8M8 1.5V14.5M1.5 8H14.5" />
      )
    case 'single':
      return (
        <path d="M1.5 14V2C1.5 1.72386 1.72386 1.5 2 1.5H14C14.2761 1.5 14.5 1.72386 14.5 2V14C14.5 14.2761 14.2761 14.5 14 14.5H2C1.72386 14.5 1.5 14.2761 1.5 14Z" />
      )
    default:
      return null
  }
}

const Icon = ({ size, glyph }) => (
  <svg
    style={{ width: size, height: size }}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="square"
  >
    <Glyph glyph={glyph} />
  </svg>
)

export const IconButton = ({
  label,
  onClick,
  isActive,
  glyph,
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
    <Icon size={buttonIconSize} glyph={glyph} />
  </button>
)
