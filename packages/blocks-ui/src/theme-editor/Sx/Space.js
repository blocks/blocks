/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment, useState, useEffect } from 'react'
import { Field, Slider, Grid } from '@theme-ui/components'

const MODES = [
  {
    name: 'single',
    icon: null,
    keys: [{ label: 'All', key: '%s' }]
  },
  {
    name: 'axis',
    icon: null,
    keys: [
      { label: 'Horizontal', key: '%sx' },
      { label: 'Vertical', key: '%sy' }
    ]
  },
  {
    name: 'all',
    icon: null,
    keys: [
      { label: 'Top', key: '%st' },
      { label: 'Right', key: '%sr' },
      { label: 'Bottom', key: '%sb' },
      { label: 'Left', key: '%sl' }
    ]
  }
]

const Mode = ({ propertyKey, keys, theme: { space }, value, onChange }) => {
  const onSliderChange = (e, key) => {
    onChange({
      ...value,
      [key.replace('%s', propertyKey)]: parseInt(e.target.value)
    })
  }

  const min = 0
  const max = space.length - 1

  return (
    <Fragment>
      <Grid cols={1}>
        {keys.map(({ key, label }) => (
          <Field
            key={key}
            label={label}
            value={value[key.replace('%s', propertyKey)]}
            onChange={e => onSliderChange(e, key)}
            min={min}
            max={max}
            step={1}
            as={Slider}
          />
        ))}
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

  useEffect(() => {
    // TODO Convert values between mode
  }, [mode])

  return (
    <div>
      <div sx={{ display: 'flex', mt: 3, mb: 3 }}>
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
