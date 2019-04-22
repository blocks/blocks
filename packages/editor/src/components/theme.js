export default {
  colors: {
    text: '#000',
    body: 'inherit',
    heading: 'inherit',
    background: '#fff',
    primary: '#33e',
    secondary: '#11a',
    gray: '#ccc',
    lightgray: '#f6f6f6',
    yellow: '#ffc',
    dark: {
      text: '#fff',
      body: 'inherit',
      heading: 'inherit',
      background: '#111122',
      primary: '#3af',
      secondary: '#18d',
      gray: '#223',
      lightgray: '#161628',
      yellow: '#ff0'
    }
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
    monospace: '"Roboto Mono", Menlo, monospace'
  },
  fontWeights: {
    body: 400,
    heading: 600
  },
  lineHeights: {
    body: 1.5,
    heading: 1.2
  },
  mediaQueries: {
    big: '@media screen and (min-width: 40em)'
  },
  styles: {
    h1: {
      fontSize: [5, 6],
      fontWeight: 'heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      color: 'heading',
      a: {
        color: 'inherit',
        textDecoration: 'none'
      }
    },
    h2: {
      fontSize: [4, 5],
      fontWeight: 'heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      color: 'heading',
      a: {
        color: 'inherit',
        textDecoration: 'none'
      }
    },
    h3: {
      fontSize: [3, 4],
      fontWeight: 'heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      color: 'heading',
      a: {
        color: 'inherit',
        textDecoration: 'none'
      }
    },
    h4: {
      fontSize: 3,
      fontWeight: 'heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      color: 'heading',
      a: {
        color: 'inherit',
        textDecoration: 'none'
      }
    },
    h5: {
      fontSize: 2,
      fontWeight: 'heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      color: 'heading',
      a: {
        color: 'inherit',
        textDecoration: 'none'
      }
    },
    h6: {
      fontSize: 1,
      fontWeight: 'heading',
      fontFamily: 'heading',
      lineHeight: 'heading',
      color: 'heading',
      a: {
        color: 'inherit',
        textDecoration: 'none'
      }
    },
    p: {
      fontSize: 3,
      fontWeight: 'body',
      fontFamily: 'body',
      lineHeight: 'body',
      color: 'body'
    },
    a: {
      color: 'primary',
      '&:hover': {
        color: 'secondary'
      }
    },
    table: {
      width: '100%',
      my: 4,
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    th: {
      textAlign: 'left',
      verticalAlign: 'bottom',
      paddingTop: '4px',
      paddingBottom: '4px',
      paddingRight: '4px',
      paddingLeft: 0,
      borderColor: 'inherit',
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid'
    },
    td: {
      textAlign: 'left',
      verticalAlign: 'top',
      paddingTop: '4px',
      paddingBottom: '4px',
      paddingRight: '4px',
      paddingLeft: 0,
      borderColor: 'inherit',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid'
    },
    inlineCode: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
      bg: 'lightgray'
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 1,
      overflowX: 'auto'
    },
    hr: {
      border: 0,
      borderBottom: '1px solid',
      my: 4,
      color: 'lightgray'
    },
    ul: {
      pl: 3
    },
    img: {
      maxWidth: '100%',
      height: 'auto'
    }
  },
  prism: {
    plain: {
      color: '#282a2e',
      backgroundColor: '#f6f6f6'
    },
    styles: [
      {
        types: ['comment'],
        style: {
          color: '#666'
        }
      },
      {
        types: ['string', 'number', 'builtin', 'variable'],
        style: {
          color: '#444'
        }
      },
      {
        types: ['class-name', 'function', 'tag', 'attr-name'],
        style: {
          color: 'rgb(40, 42, 46)'
        }
      }
    ],
    dark: {
      plain: {
        color: '#eee',
        backgroundColor: '#161628'
      },
      styles: [
        {
          types: ['comment'],
          style: {
            color: '#999'
          }
        },
        {
          types: ['string', 'number', 'builtin', 'variable'],
          style: {
            color: '#fff'
          }
        },
        {
          types: ['class-name', 'function', 'tag', 'attr-name'],
          style: {
            color: '#eee'
          }
        }
      ]
    }
  }
}
