import { system as systemTheme } from '@theme-ui/presets'

export default {
  ...systemTheme,
  colors: {
    ...systemTheme.colors,
    border: '#e1e6eb'
  },
  styles: {
    ...systemTheme.styles,
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
      color: 'text',
      bg: 'background',
      borderColor: 'text',
      border: 'thin solid'
    }
  }
}
