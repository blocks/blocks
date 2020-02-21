/** @jsx jsx */
import { jsx } from 'theme-ui'

import { IconButton } from './ui'

export const SegmentedControl = ({
  options,
  activeIndex,
  onChange,
  ...rest
}) => {
  return (
    <div
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridGap: '1px',
        bg: 'border',
        border: '1px solid',
        borderColor: 'border',
        borderRadius: 4,
        overflow: 'hidden'
      }}
      {...rest}
    >
      {options.map((option, index) => (
        <SegmentedControlButton
          key={index}
          isActive={activeIndex === index}
          label={option.label}
          icon={option.icon}
          onClick={() => onChange(option, index)}
        />
      ))}
    </div>
  )
}

export const SegmentedControlButton = ({
  label,
  onClick,
  isActive,
  icon: Icon,
  disabled,
  ...rest
}) => (
  <IconButton
    title={label}
    aria-label={label}
    onClick={onClick}
    sx={{
      bg: isActive ? 'highlight' : 'white',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      '&:hover, &:focus': {
        bg: isActive || disabled ? null : '#f2f3f5',
        stroke: null
      },
      svg: {
        // fill: isActive ? 'primary' : null,
        stroke: isActive ? 'primary' : null
      }
    }}
    disabled={disabled}
    {...rest}
  >
    <Icon size={16} />
  </IconButton>
)
