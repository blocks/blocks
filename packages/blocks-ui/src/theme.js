import { system as systemTheme } from '@theme-ui/presets'

export default {
  ...systemTheme,
  colors: {
    ...systemTheme.colors,
    border: '#e1e6eb'
  },
  breakpoints: [360, 600, 1024],
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
  },
  forms: {
    label: {
      fontSize: 0,
      fontWeight: 'normal',
      mb: 1
    },
    input: {
      display: 'block',
      fontSize: 0,
      fontWeight: 'normal',
      height: 40,
      border: 'thin solid #b6bcc2',
      width: '100%',
      borderRadius: 0,
      '&:hover, &:focus': {
        border: 'thin solid #83898f'
      }
    },
    select: {
      display: 'block',
      fontSize: 0,
      fontWeight: 'normal',
      height: 40,
      border: 'thin solid #b6bcc2',
      width: '100%',
      borderRadius: 0,
      '&:hover, &:focus': {
        border: 'thin solid #83898f'
      }
    }
  }
}
