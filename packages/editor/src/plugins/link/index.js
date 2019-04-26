import queries from './queries'
import commands from './commands'
import onKeyDown from './onKeyDown'
import onPaste from './onPaste'
import renderEditor from './renderEditor'

export default (opts = {}) => ({
  queries,
  commands,
  onKeyDown,
  onPaste,
  renderEditor
})
