import React, { useMemo } from 'react'

export default ({ code, scope, ...props }) => {
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

  return <div {...props}>{element}</div>
}
