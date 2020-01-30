import React from 'react'
import { jsx, Context, useThemeUI, merge } from 'theme-ui'
import { ThemeContext as Emotion } from '@emotion/core'

const reducer = (state, next) => merge(state, next)

export const EditorProvider = ({ children, theme: propsTheme, onChange }) => {
  const outer = useThemeUI()
  const [theme, setTheme] = React.useReducer(reducer, propsTheme)
  const context = {
    ...outer,
    theme: propsTheme,
    setTheme
  }

  React.useEffect(() => {
    onChange(theme)
  }, [theme])

  return jsx(
    Context.Provider,
    {
      value: context
    },
    jsx(Emotion.Provider, {
      value: propsTheme,
      children
    })
  )
}
