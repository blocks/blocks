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
        <IconButton
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
