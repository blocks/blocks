import { system } from '@theme-ui/presets'
import prism from '@theme-ui/prism/presets/theme-ui'

const theme = {
  ...system,
  colors: {
    ...system.colors,
    border: '#e1e6eb'
  },
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
    h1: {
      ...system.styles.h1,
      '&:first-of-type': {
        mt: 0
      }
    },
    navLink: {
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 600
    },
    p: {
      ...system.styles.p,
      fontSize: [2, 3]
    },
    li: {
      fontSize: [2, 3]
    },
    img: {
      maxWidth: '100%'
    },
    code: {
      ...prism
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
