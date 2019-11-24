/** @jsx jsx */
import { jsx } from 'theme-ui'

import { useElement } from './element-context'

const IGNORED_TYPES = ['path']

export default elementSelectionHandler => (type, props, ...children) => {
  const element = useElement() || {}

  props = props || {}
  const { ___tuid: id, sx = {} } = props
  delete props.___tuid

  const isCurrentElement = id && id === element.id

  if (IGNORED_TYPES.includes(type)) {
    return jsx(type, props, ...children)
  }

  return jsx(
    type,
    {
      ...props,
      sx: {
        ...sx,
        boxShadow: isCurrentElement
          ? 'inset 0px 0px 0px 2px #0079FF'
          : sx.boxShadow
      },
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
