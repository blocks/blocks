import React from 'react'
import { ThemeProvider } from 'theme-ui'

import theme from '../../components/theme'
import Toolbar from './Toolbar'

export { default as ToolbarButton } from './ToolbarButton'

const isActive = (editor, type) => {
  return (
    editor.value.activeMarks.some(mark => mark.type === type) ||
    editor.value.inlines.some(inline => inline.type === type) ||
    editor.hasBlock(type) ||
    editor.hasOuterBlock(type)
  )
}

export default (opts = {}) => ({
  queries: {
    isActive
  },
  renderEditor: (props, editor, next) => {
    const children = next()

    return (
      <ThemeProvider theme={theme}>
        <Toolbar editor={editor} />
        {children}
      </ThemeProvider>
    )
  }
})
