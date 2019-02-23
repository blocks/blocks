import React from 'react'

import { Image } from './ui'

export default ({ name, size = 32, ...props }) => (
  <Image {...props} width={size} src={`https://icon.now.sh/${name}`} />
)
