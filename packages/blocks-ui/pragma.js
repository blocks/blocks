/** @jsx jsx */
import { jsx } from 'theme-ui'

const IGNORED_TYPES = ['path']

export default elementSelectionHandler => (type, props, ...children) => {
  props = props || {}
  const { ___tuid: id } = props
  delete props.___tuid

  if (IGNORED_TYPES.includes(type)) {
    return jsx(type, props, ...children)
  }

  return jsx(
    type,
    {
      ...props,
      onClick: e => {
        e.stopPropagation()
        if (id) {
          elementSelectionHandler(id)
        }
      }
    },
    ...children
  )
}
