/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment, useState, useEffect } from 'react'
import { Label, Slider, Grid } from '@theme-ui/components'

import { SegmentedControl } from '../../segmented-control'
import { buttonIconSize } from '../../ui'

// Fallback space options if no space is present in theme
// TODO This should come from theme-ui eventually
const DEFAULT_SPACE = [0, 4, 8, 16, 32, 64]

// Custom Icons used in the segmented control

const CustomIconSvg = props => (
  <svg
    style={{ width: buttonIconSize, height: buttonIconSize }}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
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

// The different modes spacing can be edited with
// Icon is the SVG used in segmented control
// keys are an Array of Strings which will get effected when using the slider
// i.e. ['l', 'r'] will effect `pl` and `pr` or `ml` and `mr`
// It's important to use all 4 sides (`t`/`r`/`b`/`l`) and not just `p`, `px` or `py` etc so that previous values don't conflict

const MODES = [
  {
    label: 'Single',
    icon: SingleIcon,
    keys: [{ label: 'All', keys: ['t', 'b', 'r', 'l'] }]
  },
  {
    label: 'Axis',
    icon: AxisIcon,
    keys: [
      { label: 'Horizontal', keys: ['l', 'r'] },
      { label: 'Vertical', keys: ['t', 'b'] }
    ]
  },
  {
    label: 'All',
    icon: AllIcon,
    keys: [
      { label: 'Top', keys: ['t'] },
      { label: 'Right', keys: ['r'] },
      { label: 'Bottom', keys: ['b'] },
      { label: 'Left', keys: ['l'] }
    ]
  }
]

const Mode = ({
  propertyKey,
  keys,
  theme: { space = DEFAULT_SPACE },
  value,
  onChange
}) => {
  const onSliderChange = (e, keys) => {
    // Take all of the keys for this slider (i.e. `l` and `r`) and set the correct value
    // i.e. { pl: 3, pr: 3 }
    const nextValue = keys.reduce((accum, key) => {
      accum[propertyKey + key] = parseInt(e.target.value)
      return accum
    }, {})

    // Make sure to spread the current value so we don't delete other slider values
    onChange(currentValue => ({ ...currentValue, ...nextValue }))
  }

  // Always set the min and max to the slider length so we get nice even steps
  const min = 0
  const max = space.length - 1
  const step = 1

  return (
    <Grid>
      {keys.map(({ keys, label }, index) => {
        // Since sliders can have multiple keys, just grab the first one
        const sliderValue = value[propertyKey + keys[0]] || 0
        return (
          <div key={index}>
            <div sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Label css={{ width: 'auto' }}>{label}</Label>
              <Label as="span" sx={{ width: 'auto' }}>
                {space[sliderValue]}
              </Label>
            </div>
            <Slider
              value={sliderValue}
              onChange={e => onSliderChange(e, keys)}
              min={min}
              max={max}
              step={step}
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
    <Fragment>
      <SegmentedControl
        options={MODES}
        activeIndex={activeModeIndex}
        onChange={(option, index) => setActiveModeIndex(index)}
        sx={{
          marginRight: 'auto'
        }}
      />
      <Mode
        propertyKey={propertyKey}
        value={value}
        onChange={setValue}
        theme={theme}
        keys={MODES[activeModeIndex].keys}
      />
    </Fragment>
  )
}

export default Space
