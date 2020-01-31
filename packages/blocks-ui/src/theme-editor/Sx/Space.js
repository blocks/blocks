/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment, useState, useEffect } from 'react'
import { Field, Slider, Grid } from '@theme-ui/components'

const Mode = ({ propertyKey, keys, theme: { space }, value, onChange }) => {
  const onSliderChange = (e, key) => {
    const themeValue = space[e.target.value]
    onChange({ ...value, [key.replace('%p', propertyKey)]: themeValue })
  }

  const onSingleSliderChange = e => {
    const themeValue = space[e.target.value]
    onChange(themeValue)
  }

  const min = 0
  const max = space.length - 1
  const hasKeysToEdit = Boolean(keys && keys.length > 0)

  return (
    <Fragment>
      {!hasKeysToEdit && (
        <Field
          label="All"
          value={space.findIndex(i => i === value)}
          onChange={onSingleSliderChange}
          min={min}
          max={max}
          step={1}
          as={Slider}
        />
      )}
      {hasKeysToEdit && (
        <Grid cols={1}>
          {keys.map(({ key, label }) => (
            <Field
              key={key}
              label={label}
              value={space.findIndex(i => i === value[key])}
              onChange={e => onSliderChange(e, key)}
              min={min}
              max={max}
              step={1}
              as={Slider}
            />
          ))}
        </Grid>
      )}
    </Fragment>
  )
}

const MODES = [
  {
    name: 'single',
    icon: null,
    keys: null
  },
  {
    name: 'axis',
    icon: null,
    keys: [
      { label: 'Horizontal', key: '%px' },
      { label: 'Vertical', key: '%py' }
    ]
  },
  {
    name: 'custom',
    icon: null,
    keys: [
      { label: 'Top', key: '%pt' },
      { label: 'Right', key: '%pr' },
      { label: 'Bottom', key: '%pb' },
      { label: 'Left', key: '%pl' }
    ]
  }
]

export const Space = ({ property, theme, onChange }) => {
  const [mode, setMode] = useState(MODES[0])
  const [value, setValue] = useState({})

  const propertyKey = property === 'margin' ? 'm' : 'p'

  useEffect(() => {
    onChange(value)
  }, [propertyKey, value])

  useEffect(() => {
    // convert values between mode
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
