import React from 'react'
import { Styled, ThemeProvider } from 'theme-ui'
import { Global } from '@emotion/core'

import { EditorProvider } from './editor-context'
import { ElementProvider } from './element-context'

export default ({ theme, elementData, children }) => {
  return (
    <EditorProvider>
      <ElementProvider value={elementData}>
        <ThemeProvider theme={theme}>
          <Styled.root>
            <Global
              styles={{
                '*': {
                  boxSizing: 'border-box'
                },
                body: {
                  margin: 0
                }
              }}
            />
            {children}
          </Styled.root>
        </ThemeProvider>
      </ElementProvider>
    </EditorProvider>
  )
}
