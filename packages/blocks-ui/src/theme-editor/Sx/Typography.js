/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { Label, Slider } from '@theme-ui/components'

import Combobox from '../Combobox'

// Fallback font size options if no fontSizes are present in theme
// TODO This should come from theme-ui eventually
const DEFAULT_FONT_SIZES = [12, 14, 16, 20, 24, 32, 48, 64, 72]

export const SxTypography = ({
  tag,
  value: { fontFamily, fontSize, fontWeight, lineHeight } = {},
  theme: {
    fonts = {},
    fontSizes = DEFAULT_FONT_SIZES,
    fontWeights = {},
    lineHeights = {}
  } = {},
  onChange
}) => {
  const prefixName = name => (tag ? `styles.${tag}.${name}` : name)

  return (
    <Fragment>
      <Combobox
        name={prefixName('fontFamily')}
        label="Font Family"
        value={fontFamily || ''}
        onChange={fontFamily => {
          onChange({ fontFamily })
        }}
        options={['inherit', ...Object.keys(fonts)]}
      />
      <div
        sx={{
          display: 'grid',
          gridGap: 2,
          gridTemplateColumns: 'repeat(2, 1fr)'
        }}
      >
        <Combobox
          name={prefixName('fontWeight')}
          label="Font Weight"
          value={fontWeight || ''}
          onChange={fontWeight => {
            onChange({ fontWeight })
          }}
          options={['inherit', ...Object.keys(fontWeights)]}
        />
        <Combobox
          name={prefixName('lineHeight')}
          label="Line Height"
          value={lineHeight || ''}
          onChange={lineHeight => {
            onChange({ lineHeight })
          }}
          options={['inherit', ...Object.keys(lineHeights)]}
        />
      </div>
      <FontSizeEditor
        fontSizes={fontSizes}
        value={fontSize || ''}
        onChange={e => onChange({ fontSize: parseInt(e.target.value) })}
      />
    </Fragment>
  )
}

export default SxTypography

const FontSizeEditor = ({ fontSizes, value, onChange }) => {
  const min = 0
  const max = fontSizes.length - 1
  const step = 1
  const sliderValue = value !== '' ? value : 0

  return (
    <div>
      <div sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Label css={{ width: 'auto' }}>Font Size</Label>
        <Label as="span" sx={{ width: 'auto' }}>
          {value !== '' ? fontSizes[value] : 'Auto'}
        </Label>
      </div>
      <Slider
        value={sliderValue}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />
    </div>
  )
}
