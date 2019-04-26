import { keyboardEvent } from '@slate-editor/utils'

export default (event, editor, next) => {
  if (!keyboardEvent.isMod(event)) return next()
  const opt = event.altKey

  if (opt) {
    switch (event.keyCode) {
      // Q
      case 81:
        editor.toggleBlockQuote()
        break
      // 1
      case 49:
        editor.toggleHeadingOne()
        break
      // 2
      case 50:
        editor.toggleHeadingTwo()
        break
      default:
        return next()
    }
  }

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
