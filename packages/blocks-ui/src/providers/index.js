import React from 'react'
import { ThemeProvider } from 'theme-ui'

import CodeProvider from './code'
import EditorProvider from './editor'
import ThemeEditorProvider from './theme-editor'
import ScopeProvider from './scope'
import BlocksProvider from './blocks'
import CanvasProvider from './canvas'

export default ({
  appTheme,
  theme,
  initialCode,
  blocks,
  scope,
  onChange,
  children
}) => (
  <ThemeProvider theme={appTheme}>
    <BlocksProvider blocks={blocks}>
      <EditorProvider>
        <ThemeEditorProvider theme={theme}>
          <ScopeProvider scope={scope}>
            <CodeProvider initialCode={initialCode} onChange={onChange}>
              <CanvasProvider>{children}</CanvasProvider>
            </CodeProvider>
          </ScopeProvider>
        </ThemeEditorProvider>
      </EditorProvider>
    </BlocksProvider>
  </ThemeProvider>
)
