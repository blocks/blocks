import React from 'react'

import { Styled } from './ui'

export default ({ name, size = 32, ...props }) => (
  <Styled.img
    {...props}
    width={size}
    alt={`${name} icon`}
    src={`https://icon.now.sh/${name}`}
  />
)
