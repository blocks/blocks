/** @jsx jsx */
import * as recipes from '@blocks/builder/recipes'
import { jsx, ThemeProvider, Styled } from 'theme-ui'
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
  },
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      '&:hover': {
        bg: 'text'
      }
    },
    secondary: {
      color: 'background',
      bg: 'secondary'
    }
  }
}

export default () => (
  <ThemeProvider theme={theme}>
    <Styled.root>
      {Object.entries(recipes).map(([name, Component]) => (
        <div
          key={name}
          sx={{
            backgroundColor: 'primary'
          }}
        >
          <h3 style={{ borderBottom: 'thin solid', margin: 0, padding: 8 }}>
            {name}
          </h3>
          <Component />
        </div>
      ))}
    </Styled.root>
  </ThemeProvider>
)
