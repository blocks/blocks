import React from 'react'
import { jsx } from 'theme-ui'

import { toTransformedBlockJSX } from './transforms'

export default ({ code, scope: providedScope, ...props }) => {
  const transformed = toTransformedBlockJSX(code)
  const scope = { jsx, ...providedScope }

  /* eslint-disable */
  const fn = new Function(
    'React',
    ...Object.keys(scope),
    `${transformed};
    return React.createElement(BLOCKS_Container)`
  )
  /* eslint-enable */

  const element = fn(React, ...Object.values(scope))

  return <div {...props}>{element}</div>
}
