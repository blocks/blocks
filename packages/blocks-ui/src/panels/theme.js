/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import * as presets from '@theme-ui/presets'
import { Box, Heading, Label, Select, Button } from '@theme-ui/components'
import {
  Editor,
  Row,
  Fonts,
  FontSizes,
  FontWeights,
  LineHeights,
  ColorMode,
  ColorPalette,
  Space
} from '@theme-ui/editor'
import merge from 'lodash.merge'

import useCopyToClipboard from '../use-copy-to-clipboard'
import { useThemeEditor } from '../providers/theme-editor'

const themes = Object.keys(presets)
const options = themes.map(name => <option key={name} children={name} />)

export default () => {
  const { update, ...theme } = useThemeEditor()
  const { hasCopied, copyToClipboard } = useCopyToClipboard()

  return (
    <Box p={3}>
      <Heading mb={3}>Theme</Heading>
      <ThemePresetForm theme={theme} setTheme={update} />
      <ThemeEditor theme={theme} setTheme={update} />
      <Box mt={3}>
        <Button
          variant="secondary"
          onClick={() => copyToClipboard(JSON.stringify(theme))}
        >
          {hasCopied ? 'Copied' : 'Copy'} Theme
        </Button>
      </Box>
    </Box>
  )
}

const defaultBreakpoints = [360, 600, 1024]

const ThemePresetForm = ({ setTheme }) => {
  const [themeName, setThemeName] = useState('system')

  const onPresetChange = e => {
    const presetKey = e.target.value
    setTheme(currentTheme =>
      merge(
        {},
        { ...currentTheme, breakpoints: defaultBreakpoints },
        presets[presetKey]
      )
    )
    setThemeName(presetKey)
  }

  const onSubmit = e => e.preventDefault()

  return (
    <Box as="form" mb={3} onSubmit={onSubmit}>
      <Label htmlFor="preset">Theme UI Preset</Label>
      <Select
        id="preset"
        name="preset"
        value={themeName}
        onChange={onPresetChange}
        children={options}
      />
    </Box>
  )
}

const ThemeEditor = ({ theme, setTheme }) => {
  const context = {
    theme,
    setTheme(nextTheme) {
      setTheme(currentTheme => merge({}, currentTheme, nextTheme))
    }
  }
  return (
    <Box>
      <Heading as="h3" mb={2}>
        Theme Editor
      </Heading>
      <Editor context={context}>
        <Fonts />
        <Row>
          <FontSizes />
        </Row>
        <Row>
          <FontWeights />
        </Row>
        <Row>
          <LineHeights />
        </Row>
        <ColorMode />
        <ColorPalette />
        <Row>
          <Space />
        </Row>
      </Editor>
    </Box>
  )
}
