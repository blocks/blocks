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

  const { displayName = '' } = type

  const styles =
    id &&
    (displayName !== 'Connect(Droppable)' ||
      displayName !== 'Connect(Draggable)' ||
      !type.includes('BLOCKS_Droppable'))
      ? {
          position: 'relative',
          //display: 'block',
          ':after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '2px solid rgba(0,0,0,0.5)'
          }
        }
      : null

  if (styles) {
    console.log(type)
  }

  return jsx(
    type,
    {
      ...props,
      onClick: e => {
        e.stopPropagation()
        elementSelectionHandler(id)
      }
    },
    ...children
  )
}
