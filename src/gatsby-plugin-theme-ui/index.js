import { system } from '@theme-ui/presets'

const theme = {
  ...system,
  fontWeights: {
    body: 400,
    heading: 600,
    display: 600
  },
  sizes: {
    container: '48em',
    measure: '32em'
  },
  styles: {
    ...system.styles,
    navLink: {
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 600
    },
    p: {
      ...system.styles.p,
      fontSize: [2, 3]
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

export default theme
