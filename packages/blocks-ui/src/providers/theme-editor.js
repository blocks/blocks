import React, { useState, useContext } from 'react'
import { system as systemTheme } from '@theme-ui/presets'

import appTheme from '../theme'

const DEFAULT_THEME = {
  ...systemTheme,
  space: [0, 4, 8, 16, 32, 64],
  breakpoints: appTheme.breakpoints,
  forms: appTheme.forms
}

const ThemeEditorContext = React.createContext({})

export const useThemeEditor = () => {
  const value = useContext(ThemeEditorContext)

  return value
}

const ThemeEditorProvider = ({ theme = DEFAULT_THEME, children }) => {
  const [value, update] = useState(theme)

  return (
    <ThemeEditorContext.Provider value={{ ...value, update }}>
      {children}
    </ThemeEditorContext.Provider>
  )
}

export default ThemeEditorProvider
