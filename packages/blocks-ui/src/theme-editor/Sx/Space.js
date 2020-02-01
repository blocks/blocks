/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment, useState, useEffect } from 'react'
import { Label, Slider, Grid } from '@theme-ui/components'

const MODES = [
  {
    name: 'single',
    icon: null,
    keys: [{ label: 'All', keys: ['t', 'b', 'r', 'l'] }]
  },
  {
    name: 'axis',
    icon: null,
    keys: [
      { label: 'Horizontal', keys: ['l', 'r'] },
      { label: 'Vertical', keys: ['t', 'b'] }
    ]
  },
  {
    name: 'all',
    icon: null,
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
    <Fragment>
      <Grid cols={1}>
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
    </Fragment>
  )
}

export const Space = ({ property, theme, onChange, value: valueProp }) => {
  const propertyKey = property === 'margin' ? 'm' : 'p'

  const [mode, setMode] = useState(MODES[0])
  const [value, setValue] = useState({ [propertyKey]: valueProp[propertyKey] })

  useEffect(() => {
    onChange(value)
  }, [propertyKey, value])

  return (
    <div>
      <div sx={{ display: 'flex', mt: 3, mb: 3, ml: 'auto' }}>
        {MODES.map(mode => (
          <button key={mode.name} onClick={() => setMode(mode)}>
            {mode.name}
          </button>
        ))}
      </div>
      <Mode
        propertyKey={propertyKey}
        value={value}
        onChange={setValue}
        theme={theme}
        keys={mode.keys}
      />
      <strong sx={{ mt: 2 }}>{JSON.stringify({ value })}</strong>
    </div>
  )
}

export default Space
