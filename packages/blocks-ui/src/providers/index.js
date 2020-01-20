import React from 'react'
import { ThemeProvider } from 'theme-ui'

import CodeProvider from './code'
import EditorProvider from './editor'
import ThemeEditorProvider from './theme-editor'
import ElementProvider from './element'
import ScopeProvider from './scope'
import BlocksProvider from './blocks'

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
        <ElementProvider>
          <ThemeEditorProvider theme={theme}>
            <ScopeProvider scope={scope}>
              <CodeProvider initialCode={initialCode} onChange={onChange}>
                {children}
              </CodeProvider>
            </ScopeProvider>
          </ThemeEditorProvider>
        </ElementProvider>
      </EditorProvider>
    </BlocksProvider>
  </ThemeProvider>
)
