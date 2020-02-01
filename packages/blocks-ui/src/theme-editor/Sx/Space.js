/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, useEffect } from 'react'
import { Label, Slider, Grid } from '@theme-ui/components'

import { IconButton } from '../../ui'

// Custom Icons
// TODO these should be replaced with proper icons from feather or a real designer

const SingleIcon = props => (
  <svg
    sx={{ width: 14, height: 14, fill: 'currentColor' }}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M22 2H2L2 22H22V2ZM2 0C0.895431 0 0 0.89543 0 2V22C0 23.1046 0.89543 24 2 24H22C23.1046 24 24 23.1046 24 22V2C24 0.895431 23.1046 0 22 0H2Z"
    />
  </svg>
)

const AxisIcon = props => (
  <svg
    sx={{ width: 14, height: 14, fill: 'currentColor' }}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11 2V11H2L2 7C2 6.44772 1.55228 6 1 6C0.447715 6 0 6.44771 0 7V11V13V17C0 17.5523 0.447715 18 0.999999 18C1.55228 18 2 17.5523 2 17L2 13H11V22H7C6.44772 22 6 22.4477 6 23C6 23.5523 6.44771 24 7 24H11H13H17C17.5523 24 18 23.5523 18 23C18 22.4477 17.5523 22 17 22H13V13H22V17C22 17.5523 22.4477 18 23 18C23.5523 18 24 17.5523 24 17V13V11V7C24 6.44772 23.5523 6 23 6C22.4477 6 22 6.44771 22 7V11H13V2H17C17.5523 2 18 1.55228 18 1C18 0.447715 17.5523 0 17 0H13H11H7C6.44772 0 6 0.447715 6 1C6 1.55228 6.44771 2 7 2H11Z" />
  </svg>
)

const AllIcon = props => (
  <svg
    sx={{ width: 14, height: 14, fill: 'currentColor' }}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 0C5.44772 0 5 0.447715 5 1C5 1.55228 5.44772 2 6 2H18C18.5523 2 19 1.55228 19 1C19 0.447715 18.5523 0 18 0H6ZM6 22C5.44772 22 5 22.4477 5 23C5 23.5523 5.44772 24 6 24H18C18.5523 24 19 23.5523 19 23C19 22.4477 18.5523 22 18 22H6ZM1 5C1.55228 5 2 5.44772 2 6L2 18C2 18.5523 1.55228 19 0.999999 19C0.447715 19 0 18.5523 0 18V6C0 5.44772 0.447715 5 1 5ZM24 6C24 5.44772 23.5523 5 23 5C22.4477 5 22 5.44772 22 6V18C22 18.5523 22.4477 19 23 19C23.5523 19 24 18.5523 24 18V6Z"
      fill="black"
    />
  </svg>
)

const MODES = [
  {
    icon: SingleIcon,
    keys: [{ label: 'All', keys: ['t', 'b', 'r', 'l'] }]
  },
  {
    name: 'axis',
    icon: AxisIcon,
    keys: [
      { label: 'Horizontal', keys: ['l', 'r'] },
      { label: 'Vertical', keys: ['t', 'b'] }
    ]
  },
  {
    name: 'all',
    icon: AllIcon,
    keys: [
      { label: 'Top', keys: ['t'] },
      { label: 'Right', keys: ['r'] },
      { label: 'Bottom', keys: ['b'] },
      { label: 'Left', keys: ['l'] }
    ]
  }
]

const Mode = ({ propertyKey, keys, theme: { space }, value, onChange }) => {
  const onSliderChange = (e, keys) => {
    const nextValue = keys.reduce((accum, key) => {
      accum[propertyKey + key] = parseInt(e.target.value)
      return accum
    }, {})
    onChange(currentValue => ({ ...currentValue, ...nextValue }))
  }

  const min = 0
  const max = space.length - 1

  return (
    <Grid>
      {keys.map(({ keys, label }, index) => {
        const sliderValue = value[propertyKey + keys[0]] || 0
        return (
          <div key={index}>
            <div sx={{ display: 'flex', justifyContent: 'space-btwee' }}>
              <Label>{label}</Label>
              <Label as="span" sx={{ width: 'auto' }}>
                {space[sliderValue]}
              </Label>
            </div>
            <Slider
              value={sliderValue}
              onChange={e => onSliderChange(e, keys)}
              min={min}
              max={max}
              step={1}
            />
          </div>
        )
      })}
    </Grid>
  )
}

export const Space = ({ property, theme, onChange, value: valueProp }) => {
  const propertyKey = property === 'margin' ? 'm' : 'p'
  const [activeModeIndex, setActiveModeIndex] = useState(0)
  const [value, setValue] = useState({ [propertyKey]: valueProp[propertyKey] })

  useEffect(() => {
    onChange(value)
  }, [propertyKey, value])

  return (
    <div>
      <div
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridGap: '1px',
          borderRadius: 4,
          overflow: 'hidden',
          bg: 'border',
          border: '1px solid',
          borderColor: 'border',
          mt: 3,
          mb: 3
        }}
      >
        {MODES.map((mode, index) => {
          const isActive = index === activeModeIndex
          return (
            <IconButton
              key={index}
              onClick={() => setActiveModeIndex(index)}
              sx={{
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                bg: isActive ? 'border' : 'white',
                fill: isActive ? 'primary' : null,
                '&:hover, &:focus': {
                  bg: isActive ? null : '#f2f3f5',
                  stroke: null
                }
              }}
            >
              {mode.icon()}
            </IconButton>
          )
        })}
      </div>
      <Mode
        propertyKey={propertyKey}
        value={value}
        onChange={setValue}
        theme={theme}
        keys={MODES[activeModeIndex].keys}
      />
    </div>
  )
}

export default Space
