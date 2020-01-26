/** @jsx jsx */
import { jsx, useThemeUI, ThemeProvider } from 'theme-ui'
import { Fragment, useState } from 'react'
import * as presets from '@theme-ui/presets'
import { Box, Label, Select, Button } from '@theme-ui/components'
import { Theme, EditorProvider } from '@theme-ui/editor'
import merge from 'lodash.merge'

import useCopyToClipboard from '../use-copy-to-clipboard'
import { useThemeEditor } from '../providers/theme-editor'
import { PanelGroup } from '../panel-group'

const themes = Object.keys(presets)
const options = themes.map(name => <option key={name} children={name} />)

export default () => {
  const appTheme = useThemeUI()
  const { value: theme, update } = useThemeEditor()
  const { hasCopied, copyToClipboard } = useCopyToClipboard()

  const updateTheme = newTheme => {
    update({
      ...newTheme,
      forms: appTheme.forms
    })
  }

  console.log({ ...theme })

  return (
    <Fragment>
      <PanelGroup title="Preset Theme">
        <ThemePresetForm theme={theme} setTheme={update} />
      </PanelGroup>
      <ThemeEditor theme={theme} setTheme={updateTheme} />
      <PanelGroup title="Copy Theme">
        <Button
          variant="secondary"
          onClick={() => copyToClipboard(JSON.stringify(theme))}
        >
          {hasCopied ? 'Copied' : 'Copy to clipboard'}
        </Button>
      </PanelGroup>
    </Fragment>
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
    <Box as="form" onSubmit={onSubmit}>
      <Label htmlFor="preset-theme">Theme</Label>
      <Select
        id="preset-theme"
        name="preset-theme"
        value={themeName}
        onChange={onPresetChange}
        children={options}
      />
    </Box>
  )
}

const ThemeEditor = () => {
  const { value: theme } = useThemeEditor()
  return (
    <div>
      <EditorProvider theme={theme}>
        <PanelGroup title="Colors">
          <Theme.Colors onChange={value => console.log(value)} />
        </PanelGroup>
        <PanelGroup title="Fonts">
          <Theme.Fonts />
        </PanelGroup>
        <PanelGroup title="Font Weights">
          <Theme.FontWeights />
        </PanelGroup>
        <PanelGroup title="Line Heights">
          <Theme.LineHeights />
        </PanelGroup>
      </EditorProvider>
    </div>
  )
}
