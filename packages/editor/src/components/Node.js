import React from 'react'
import * as Rebass from 'rebass'
import { LiveProvider, LivePreview, LiveError } from 'react-live'
import { mdComponents as md } from 'unified-ui'

import Unfurl from './Unfurl'
import CodeBlock from './CodeBlock'
import { CheckListItem } from './CheckList'
import { Image } from './ui'

export default (props, next) => {
  const { attributes, children, node, editor, onChange } = props

  switch (node.type) {
    case 'block-quote':
      return <md.blockquote {...attributes}>{children}</md.blockquote>
    case 'bulleted-list':
      return <md.ul {...attributes}>{children}</md.ul>
    case 'numbered-list':
      return <md.ol {...attributes}>{children}</md.ol>
    case 'heading-one':
      return <md.h1 {...attributes}>{children}</md.h1>
    case 'heading-two':
      return <md.h2 {...attributes}>{children}</md.h2>
    case 'heading-three':
      return <md.h3 {...attributes}>{children}</md.h3>
    case 'heading-four':
      return <md.h4 {...attributes}>{children}</md.h4>
    case 'heading-five':
      return <md.h5 {...attributes}>{children}</md.h5>
    case 'heading-six':
      return <md.h6 {...attributes}>{children}</md.h6>
    case 'list-item':
      return <md.li {...attributes}>{children}</md.li>
    case 'table':
      return (
        <table
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
                    onChange(editor.insertRow())
                  }}
                >
                  + Add row
                </span>
                <span
                  onClick={() => {
                    onChange(editor.insertColumn())
                  }}
                >
                  + Add column
                </span>
                <span
                  onClick={() => {
                    onChange(editor.removeRow())
                  }}
                >
                  - Remove row
                </span>
                <span
                  onClick={() => {
                    onChange(editor.removeColumn())
                  }}
                >
                  - Remove column
                </span>
                <span
                  onClick={() => {
                    onChange(editor.removeTable())
                  }}
                >
                  - Remove table
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      )
    case 'table_row':
      return (
        <tr style={{}} {...attributes}>
          {children}
        </tr>
      )
    case 'table_cell':
      return (
        <td style={{ border: 'thin solid silver' }} {...attributes}>
          {children}
        </td>
      )
    case 'pre':
      return <CodeBlock {...attributes}>{children}</CodeBlock>
    case 'jsx':
      return (
        <>
          <CodeBlock {...attributes}>{children}</CodeBlock>
          <LiveProvider scope={Rebass} code={node.getText()}>
            <LiveError />
            <LivePreview />
          </LiveProvider>
        </>
      )
    case 'check-list-item':
      return (
        <CheckListItem
          checked={node.data.get('checked')}
          onChange={e => {
            const checked = e.target.checked
            editor.change(c => {
              c.setNodeByKey(node.key, { data: { checked } })
            })
          }}
          {...attributes}
        >
          {children}
        </CheckListItem>
      )
    case 'paragraph':
      return <md.p {...attributes}>{children}</md.p>
    case 'hr':
      return <hr />
    case 'image':
      return <Image {...attributes} src={node.data.get('src')} />
    case 'unfurl':
      return (
        <Unfurl
          {...attributes}
          href={node.data.get('href')}
          children={children}
        />
      )
    default:
      return next()
  }
}
