import React from 'react'
import { jsx } from 'theme-ui'

export default elementSelectionHandler => (type, props, ...children) => {
  props = props || {}
  const { ___tuid: id } = props
  delete props.___tuid

  return (
    <div
      onClick={e => {
        e.stopPropagation()
        elementSelectionHandler(id)
      }}
    >
      {jsx(type, props, ...children)}
    </div>
  )
}
