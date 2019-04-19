const toText = ({ nodes = [] }) =>
  nodes
    .map(n => {
      if (n.type === 'check-list-item') {
        return '- [' + (n.data.checked ? 'X' : ' ') + '] ' + toText(n) + '\n'
      }

      const { leaves = [] } = n

      return leaves
        .map(leaf => {
          if (leaf.type === 'check-list-item') {
            return '- [ ] ' + toText(leaf.nodes)
          }

          const decoration = leaf.marks
            .map(mark => {
              if (mark.type === 'code') {
                return '`'
              } else if (mark.type === 'bold') {
                return '*'
              } else if (mark.type === 'italic') {
                return '_'
              }
            })
            .filter(Boolean)
            .join('')

          return decoration + leaf.text + decoration
        })
        .join('')
    })
    .join('')

const toRow = ({ nodes = [] }) =>
  nodes
    .map(cell => {
      try {
        return cell.nodes.map(toText).join('')
      } catch (e) {
        return ''
      }
    })
    .join(' | ')

const toTable = ({ nodes = [] }) => {
  // After editing, slate-deep-table returns an immutable object,
  // let's coerce to a vanilla js object
  if (nodes.size) {
    nodes = nodes.toJSON()
  }

  const numColumns = nodes[0].nodes.length || nodes[0].nodes.size
  const rows = nodes.map(toRow)

  const [header, ...body] = rows

  let divider = []
  for (let i = 0; i < numColumns; i++) {
    divider.push('---')
  }

  return [header, divider.join(' | '), ...body].join('\n')
}

const toBlock = nodes =>
  nodes
    .filter(n => n.type === 'text')
    .map(n => n.value)
    .join('\n')

const toList = ({ nodes = {} }, indent = 0) =>
  nodes
    .map(node => {
      if (node.type === 'bulleted-list') {
        return toList(node, indent + 2)
      } else {
        let indentStr = ''
        for (let i = 0; i < indent; i++) {
          indentStr += ' '
        }
        return indentStr + '- ' + toText(node)
      }
    })
    .join('\n')

const stringifyNode = node => {
  console.log(node)
  if (node.type === 'paragraph') {
    return toText(node)
  } else if (node.type === 'heading-one') {
    return '# ' + toText(node)
  } else if (node.type === 'heading-two') {
    return '## ' + toText(node)
  } else if (node.type === 'heading-three') {
    return '### ' + toText(node)
  } else if (node.type === 'heading-four') {
    return '#### ' + toText(node)
  } else if (node.type === 'heading-five') {
    return '##### ' + toText(node)
  } else if (node.type === 'heading-six') {
    return '###### ' + toText(node)
  } else if (node.type === 'bulleted-list') {
    return toList(node)
  } else if (node.type === 'pre') {
    return '```\n' + toBlock(node) + '\n```'
  } else if (node.type === 'jsx') {
    return toText(node)
  } else if (node.type === 'bulleted-list') {
    return toList(node)
  } else if (node.type === 'unfurl') {
    return `<Unfurl href='${node.data.get('href')}' />`
  } else if (node.type === 'image') {
    return `![${node.data.get('alt') || ''}](${node.data.get('src')})`
  } else if (node.type === 'table') {
    return toTable(node)
  }

  // TODO:
  //  - links
}

export default schema => {
  try {
    return schema.document.nodes
      .map(stringifyNode)
      .filter(Boolean)
      .join('\n\n')
  } catch (e) {
    console.error(e)
  }
}
