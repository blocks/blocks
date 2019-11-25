import { getEventTransfer } from 'slate-react'
import isURL from 'is-url'

export default (event, editor, next) => {
  const { value } = editor
  if (value.selection.isCollapsed) return next()
  const transfer = getEventTransfer(event)
  const { type, text } = transfer
  if (type !== 'text' && type !== 'html') return next()
  if (!isURL(text)) return next()

  if (editor.hasLinks()) {
    editor.unwrapLink()
  }

  editor.wrapLink({ href: text })
}
