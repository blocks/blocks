import randomize from 'randomatic'
import template from '@babel/template'

const buildDraggable = (id, index) =>
  template.ast(
    `
  <BLOCKS_Draggable key='${id}' draggableId='${id}' index={${index}}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      ></div>
    )}
  </BLOCKS_Draggable>
`,
    { plugins: ['jsx'] }
  )

export default api => {
  const { types: t } = api

  return {
    visitor: {
      JSXElement(path) {
        const openingElement = path.node.openingElement

        if (t.isJSXMemberExpression(openingElement.name)) {
          const objectName =
            openingElement.name.object && openingElement.name.object.name
          const propertyName =
            openingElement.name.property && openingElement.name.property.name

          if (objectName !== 'Blocks' && propertyName !== 'Root') {
            return
          }
        } else {
          return
        }

        path.node.children = path.node.children
          .filter(node => t.isJSXElement(node))
          .map((node, i) => {
            const uuid = randomize('a0', 16)
            const { expression: childWrapper } = buildDraggable(uuid, i)
            childWrapper.children[1].expression.body.children = [node]

            node.openingElement.attributes.push(
              t.jSXAttribute(t.jSXIdentifier('___tuid'), t.stringLiteral(uuid))
            )
            return childWrapper
          })

        path.node.openingElement.name = t.jsxIdentifier('BLOCKS_Root')
        path.node.closingElement.name = t.jsxIdentifier('BLOCKS_Root')
      }
    }
  }
}
