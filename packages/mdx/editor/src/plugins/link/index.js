import queries from './queries'
import commands from './commands'
import onKeyDown from './onKeyDown'
import onPaste from './onPaste'
import renderNode from './renderNode'

export default (opts = {}) => ({
  queries,
  commands,
  onKeyDown,
  onPaste,
  renderNode
})
