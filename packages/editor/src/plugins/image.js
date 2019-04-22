import { keyboardEvent } from '@slate-editor/utils'

export default (opts = {}) => ({
  onKeyDown: (event, editor, next) => {
    console.log('image plugin', event, keyboardEvent.isMod(event))
    if (keyboardEvent.isMod(event) && event.shiftKey && event.key === 'i') {
      console.log('insert image')
      const src = prompt('Insert image URL')
      if (!src) return
      editor.insertBlock({
        type: 'image',
        data: {
          src,
          alt: 'TODO'
        }
      })
    } else {
      next()
    }
  }
})
