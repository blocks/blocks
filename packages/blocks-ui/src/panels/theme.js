/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment, useState } from 'react'
import * as presets from '@theme-ui/presets'
import { Label, Select, Button } from '@theme-ui/components'

import { Theme as BlocksThemeEditor, EditorProvider } from '../theme-editor'
import useCopyToClipboard from '../use-copy-to-clipboard'
import { useThemeEditor } from '../providers/theme-editor'
import { FieldGroup } from '../field-group'

const themes = Object.keys(presets)
const options = themes.map(name => <option key={name} children={name} />)

export default () => {
  const { update, ...theme } = useThemeEditor()
  const { hasCopied, copyToClipboard } = useCopyToClipboard()

  return (
    <Fragment>
      <ThemePresetForm theme={theme} setTheme={update} />
      <ThemeEditor theme={theme} setTheme={update} />
      <FieldGroup>
        <Button
          variant="secondary"
          onClick={() => copyToClipboard(JSON.stringify(theme))}
        >
          {hasCopied ? 'Copied' : 'Copy'} Theme
        </Button>
      </FieldGroup>
    </Fragment>
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

  return (
    <FieldGroup title="Preset">
      <div>
        <Label htmlFor="preset">Theme UI Preset</Label>
        <Select
          id="preset"
          name="preset"
          value={themeName}
          onChange={onPresetChange}
          children={options}
        />
      </div>
    </FieldGroup>
  )
}

const ThemeEditor = ({ theme, setTheme }) => {
  return (
    <Fragment>
      <EditorProvider theme={theme} onChange={setTheme}>
        <FieldGroup title="Fonts">
          <BlocksThemeEditor.Fonts />
        </FieldGroup>
        <FieldGroup title="Font Sizes">
          <BlocksThemeEditor.FontSizes />
        </FieldGroup>
        <FieldGroup title="Font Weights">
          <BlocksThemeEditor.FontWeights />
        </FieldGroup>
        <FieldGroup title="Line Heights">
          <BlocksThemeEditor.LineHeights />
        </FieldGroup>
        <FieldGroup title="Colors">
          <BlocksThemeEditor.Colors />
        </FieldGroup>
        <FieldGroup title="Space">
          <BlocksThemeEditor.Space />
        </FieldGroup>
      </EditorProvider>
    </Fragment>
  )
}
