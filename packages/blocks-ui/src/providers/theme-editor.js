import React, { useReducer, useContext } from 'react'
import merge from 'lodash.merge'
import { system as systemTheme } from '@theme-ui/presets'

import appTheme from '../theme.js'

const DEFAULT_THEME = {
  ...systemTheme,
  breakpoints: [360, 600, 1024],
  forms: appTheme.forms
}

const ThemeEditorContext = React.createContext({})

export const useThemeEditor = () => useContext(ThemeEditorContext)

const reducer = (state, next) => merge({}, state, next)

export const ThemeEditorProvider = ({ theme = DEFAULT_THEME, children }) => {
  const [value, update] = useReducer(reducer, { ...theme })

  return (
    <ThemeEditorContext.Provider value={{ value, update }}>
      {children}
    </ThemeEditorContext.Provider>
  )
}

export default ThemeEditorProvider
