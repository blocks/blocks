import React from 'react'

import * as Blocks from '../blocks'

export default () => (
  <>
    {Object.entries(Blocks).map(([name, Component]) => (
      <div key={name}>
        <span>{name}</span>
        <Component key={name} />
      </div>
    ))}
  </>
)
