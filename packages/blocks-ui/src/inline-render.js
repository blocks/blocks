/** @jsx jsx */
import React, { useMemo } from 'react'
import { jsx, ThemeProvider, Styled } from 'theme-ui'

import styles from './use-canvas-styles'

export default ({ fullHeight, code, scope, theme, ...props }) => {
  const element = useMemo(() => {
    if (!code) {
      return null
    }

    /* eslint-disable */
    const fn = new Function(
      'React',
      ...Object.keys(scope),
      `${code};
      return React.createElement(BLOCKS_Container)`
    )
    /* eslint-enable */

    return fn(React, ...Object.values(scope))
  }, [code])
  // TODO: Figure out why adding scope here breaks.
  //       I think it has to do with the inline render
  //       definition of scope.

  return (
    <ThemeProvider theme={theme}>
      <Styled.root
        {...props}
        sx={{
          height: fullHeight ? '100%' : undefined,
          color: 'text',
          bg: 'background',
          ...styles(),
          '& > div': {
            height: '100%'
          }
        }}
      >
        {element}
      </Styled.root>
    </ThemeProvider>
  )
}
