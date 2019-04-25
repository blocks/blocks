import { keyboardEvent } from '@slate-editor/utils'

export default (event, editor, next) => {
  if (!keyboardEvent.isMod(event)) return next()
  switch (event.key) {
    case 'b':
      editor.toggleBold()
      break
    case 'i':
      editor.toggleItalic()
      break
    default:
      next()
  }
}
