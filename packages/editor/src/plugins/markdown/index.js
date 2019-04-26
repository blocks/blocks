import React from 'react'

import queries from './queries'
import commands from './commands'
import renderMark from './renderMark'
import renderNode from './renderNode'
import onKeyDown from './onKeyDown'

export default (opts = {}) => ({
  queries,
  commands,
  renderMark,
  renderNode,
  onKeyDown
})
