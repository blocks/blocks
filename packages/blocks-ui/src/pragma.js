/** @jsx jsx */
import { jsx } from 'theme-ui'

import { useCode } from './providers/code'
import { useEditor } from './providers/editor'
import { uuidName } from './constants'

const IGNORED_TYPES = ['path']

export default (type, props, ...children) => {
  const {
    currentElementId,
    setCurrentElementId,
    currentHoveredElementId,
    hoverElementId,
    removeHoveredElementId
  } = useCode()
  const { updateActiveTabByName } = useEditor()

  props = props || {}
  const { [uuidName]: id, sx = {} } = props
  delete props[uuidName]

  const isCurrentElement = id && id === currentElementId
  const isHoveredElement = id && id === currentHoveredElementId

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
          : isHoveredElement
          ? 'inset 0px 0px 0px 2px #bbbbbb'
          : sx.boxShadow
      },
      onClick: e => {
        e.stopPropagation()
        if (id) {
          setCurrentElementId(id)
          updateActiveTabByName('editor')
        }
      },
      onMouseEnter: () => hoverElementId(id),
      onMouseLeave: () => removeHoveredElementId(id)
    },
    ...children
  )
}
