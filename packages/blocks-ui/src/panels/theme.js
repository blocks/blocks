/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import * as presets from '@theme-ui/presets'
import { Box, Heading, Label, Select, Button } from '@theme-ui/components'
import { Theme as BlocksThemeEditor, EditorProvider } from 'blocks-editor'

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

const ThemePresetForm = ({ setTheme }) => {
  const [themeName, setThemeName] = useState('system')

  const onPresetChange = e => {
    const presetKey = e.target.value
    setTheme(currentTheme => {
      return {
        ...presets[presetKey],
        breakpoints: currentTheme.breakpoints,
        forms: currentTheme.forms
      }
    })

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
  return (
    <Box>
      <Heading as="h3" mb={2}>
        Theme Editor
      </Heading>
      <EditorProvider theme={theme} onChange={setTheme}>
        <BlocksThemeEditor.Fonts />
        <BlocksThemeEditor.FontSizes />
        <BlocksThemeEditor.FontWeights />
        <BlocksThemeEditor.LineHeights />
        <BlocksThemeEditor.Colors />
        <BlocksThemeEditor.Space />
      </EditorProvider>
    </Box>
  )
}
