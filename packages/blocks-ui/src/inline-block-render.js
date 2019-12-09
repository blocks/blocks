import React from 'react'
import { jsx } from 'theme-ui'
import BlockError from './block-error'

import { toTransformedBlockJSX } from './transforms'

export default ({
  code,
  scope: providedScope,
  name,
  layout: BlockLayout,
  ...props
}) => {
  try {
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

    return (
      <div {...props}>
        <BlockLayout>{element}</BlockLayout>
      </div>
    )
  } catch (e) {
    return <BlockError name={name} message={e.message} />
  }
}
