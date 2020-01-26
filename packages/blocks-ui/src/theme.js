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
  },
  forms: {
    label: {
      bg: 'white',
      display: 'block',
      fontSize: 5,
      fontWeight: 'normal',
      mb: 1,
      mt: 3
    },
    input: {
      bg: 'white',
      display: 'block',
      fontSize: 4,
      fontWeight: 'normal',
      mb: 1,
      mt: 3,
      height: 60,
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
      mb: 1,
      mt: 3,
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
