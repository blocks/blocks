import React from 'react'
import * as recipes from '@blocks/builder/recipes'
import { ThemeProvider, Styled } from 'theme-ui'
import { system } from '@theme-ui/presets'

const theme = {
  ...system,
  styles: {
    ...system.styles,
    navlink: {
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 600
    }
  }
}

export default () => (
  <ThemeProvider theme={theme}>
    <Styled.root>
      {Object.entries(recipes).map(([name, Component]) => (
        <div
          style={{
            marginTop: '40px',
            marginBottom: '40px',
            border: 'thin solid'
          }}
        >
          <h3>{name}</h3>
          <Component />
        </div>
      ))}
    </Styled.root>
  </ThemeProvider>
)
