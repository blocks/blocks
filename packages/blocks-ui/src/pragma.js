/** @jsx jsx */
import { jsx } from 'theme-ui'

import { useElement } from './element-context'
import { uuidName } from './constants'

const IGNORED_TYPES = ['path']

export default elementSelectionHandler => (type, props, ...children) => {
  const element = useElement() || {}

  props = props || {}
  const { [uuidName]: id, sx = {} } = props
  delete props[uuidName]

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
          ? theme => `inset 0px 0px 0px 2px ${theme.colors.primary}`
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
