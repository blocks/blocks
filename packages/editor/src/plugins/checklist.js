import React from 'react'
import { CheckListItem } from '../components/CheckList'

export default (opts = {}) => ({
  renderNode: (props, editor, next) => {
    const { node, attributes, children } = props
    if (node.type !== 'check-list-item') return next()

    return (
      <CheckListItem
        checked={node.data.get('checked')}
        onChange={e => {
          const checked = e.target.checked
          editor.setNodeByKey(node.key, { data: { checked } })
        }}
        {...attributes}
      >
        {children}
      </CheckListItem>
    )
  }
})
