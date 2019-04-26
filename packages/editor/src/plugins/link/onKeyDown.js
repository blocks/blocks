import { keyboardEvent } from '@slate-editor/utils'

export default (event, editor, next) => {
  if (keyboardEvent.isMod(event) && event.key === 'k') {
    editor.toggleLink()
  }
  next()
}
