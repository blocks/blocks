import React from 'react'
import { Styled } from 'theme-ui'

export default (opts = {}) => ({
  renderNode: (props, editor, next) => {
    const { node, attributes, children } = props

    switch (node.type) {
      case 'table':
        return (
          <Styled.table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              borderSpacing: 0
            }}
          >
            <tbody {...attributes}>
              {children}
              <tr>
                <td>
                  <span
                    onClick={() => {
                      editor.insertRow()
                    }}
                  >
                    + Add row
                  </span>
                  <span
                    onClick={() => {
                      editor.insertColumn()
                    }}
                  >
                    + Add column
                  </span>
                  <span
                    onClick={() => {
                      editor.removeRow()
                    }}
                  >
                    - Remove row
                  </span>
                  <span
                    onClick={() => {
                      editor.removeColumn()
                    }}
                  >
                    - Remove column
                  </span>
                  <span
                    onClick={() => {
                      editor.removeTable()
                    }}
                  >
                    - Remove table
                  </span>
                </td>
              </tr>
            </tbody>
          </Styled.table>
        )
      case 'table_row':
        return <Styled.tr {...attributes}>{children}</Styled.tr>
      case 'table_cell':
        return (
          <Styled.td style={{ border: 'thin solid silver' }} {...attributes}>
            {children}
          </Styled.td>
        )
      default:
        return next()
    }
  }
})
