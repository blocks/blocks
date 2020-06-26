/** @jsx jsx */
import { jsx } from 'theme-ui'

import { ThemeColorPicker } from './ThemeColorPicker'

const Colors = ({ value: { color, bg } = {}, theme, onChange }) => {
  return (
    <div
      sx={{
        display: 'grid',
        gridGap: 2,
        gridTemplateColumns: 'repeat(2, 1fr)',
        my: 3
      }}
    >
      <div
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ThemeColorPicker
          theme={theme}
          value={color || ''}
          onChange={color => {
            onChange({ color })
          }}
          label="Color"
        />
        <div sx={{ fontSize: 0, ml: 2 }}>Color</div>
      </div>
      <div
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ThemeColorPicker
          theme={theme}
          value={bg || ''}
          onChange={bg => {
            onChange({ bg })
          }}
          label="Background Color"
        />
        <div sx={{ fontSize: 0, ml: 2 }}>Background Color</div>
      </div>
    </div>
  )
}

export default Colors
