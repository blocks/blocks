/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, useEffect } from 'react'
import { Label, Slider, Grid } from '@theme-ui/components'

import { IconButton } from '../../ui'

// Custom Icons
// TODO these should be replaced with proper icons from feather or a real designer

const CustomIconSvg = props => (
  <svg
    sx={{ width: 14, height: 14 }}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  />
)

const SingleIcon = () => (
  <CustomIconSvg>
    <path d="M1.5 14V2C1.5 1.72386 1.72386 1.5 2 1.5H14C14.2761 1.5 14.5 1.72386 14.5 2V14C14.5 14.2761 14.2761 14.5 14 14.5H2C1.72386 14.5 1.5 14.2761 1.5 14Z" />
  </CustomIconSvg>
)

const AxisIcon = () => (
  <CustomIconSvg>
    <path d="M1.5 4.5V8M1.5 11.5V8M4.5 1.5H8M11.5 1.5H8M14.5 4.5V8M14.5 11.5V8M11.5 14.5H8M4.5 14.5H8M8 1.5V14.5M1.5 8H14.5" />
  </CustomIconSvg>
)

const AllIcon = () => (
  <CustomIconSvg>
    <path d="M1.5 4.5V11.5M4.5 1.5H11.5M14.5 4.5V11.5M11.5 14.5H4.5" />
  </CustomIconSvg>
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
