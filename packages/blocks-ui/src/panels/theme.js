/** @jsx jsx */
import { jsx, useThemeUI, ThemeProvider } from 'theme-ui'
import { useState } from 'react'
import * as presets from '@theme-ui/presets'
import { Box, Heading, Label, Select, Button } from '@theme-ui/components'
import { Theme, EditorProvider } from '@theme-ui/editor'
import merge from 'lodash.merge'

import useCopyToClipboard from '../use-copy-to-clipboard'
import { useThemeEditor } from '../providers/theme-editor'

const themes = Object.keys(presets)
const options = themes.map(name => <option key={name} children={name} />)

export default () => {
  const appTheme = useThemeUI()
  const { update, ...theme } = useThemeEditor()
  const { hasCopied, copyToClipboard } = useCopyToClipboard()

  const updateTheme = newTheme => {
    update({
      ...newTheme,
      forms: appTheme.forms
    })
  }

  console.log({ ...theme })

  return (
    <Box p={3}>
      <Heading mb={3}>Theme</Heading>
      <ThemePresetForm theme={theme} setTheme={update} />
      <ThemeEditor theme={theme} setTheme={updateTheme} />
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
      <ThemeProvider theme={context.theme}>
        <EditorProvider>
          <Theme.Colors />
          <Theme.Fonts />
          <b>Font Weights</b>
          <Theme.FontWeights />
          <b>Line Heights</b>
          <Theme.LineHeights />
        </EditorProvider>
      </ThemeProvider>
    </Box>
  )
}
