/** @jsx jsx */
import React, { useMemo } from 'react'
import { jsx, ThemeProvider, Styled } from 'theme-ui'

export default ({
  code,
  scope,
  theme,
  ...props
}) => {
  console.log({ theme, colors: theme.colors.background })
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
  }, [code]) // TODO: Figure out why adding scope here breaks.
  //       I think it has to do with the inline render
  //       definition of scope.

  return (
    <ThemeProvider theme={theme}>
      <Styled.root
        {...props}
        sx={{
          color: 'text',
          bg: 'background',
        }}>
        {element}
      </Styled.root>
    </ThemeProvider>
  )
}
