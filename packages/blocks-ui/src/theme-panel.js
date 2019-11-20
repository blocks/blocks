/** @jsx jsx */
import { jsx } from 'theme-ui'
import * as presets from '@theme-ui/presets'
import {
  Box,
  Heading,
  Label,
  Select,
} from '@theme-ui/components'

const themes = Object.keys(presets)
const options = themes.map(name => (
  <option key={name} children={name} />
))

export default ({
  themeName,
  setThemeName,
}) => {
  const onSubmit = e => {
    e.preventDefault()
  }

  return (
    <Box p={3}>
      <Heading>
        Theme
      </Heading>
      <form onSubmit={onSubmit}>
        <Label htmlFor='preset'>
          Preset
        </Label>
        <Select
          value={themeName}
          onChange={e => {
            setThemeName(e.target.value)
          }}
          children={options}
        />
      </form>
    </Box>
  )
}
