import template from '@babel/template'

import { isBlocksRootElement } from '../util'

const navRoot = id =>
  template.ast(
    `
  <BLOCKS_Droppable droppableId="element-${id}">
    {(provided, snapshot) => (
      <span
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        {provided.placeholder}
      </span>
    )}
  </BLOCKS_Droppable>
`,
    { plugins: ['jsx'] }
  )

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

const buildInlineDraggable = (id, index) =>
  template.ast(
    `
  <BLOCKS_Draggable key='${id}' draggableId='${id}' index={${index}}>
    {(provided, snapshot) => (
      <span
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      ></span>
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
        let isNav = false

        if (!isBlocksRootElement(openingElement)) {
          return
        }

        path.node.children = path.node.children
          .filter(node => t.isJSXElement(node))
          .map((node, i) => {
            const tuid = node.openingElement.attributes.find(
              node => node.name && node.name.name === '___tuid'
            )

            if (!tuid) {
              return
            }

            const id = tuid.value.value

            const { expression: childWrapper } = isNav
              ? buildInlineDraggable(id, i)
              : buildDraggable(id, i)
            childWrapper.children[1].expression.body.children = [node]

            return childWrapper
          })

        if (t.isJSXMemberExpression(openingElement.name)) {
          path.node.openingElement.name = t.jsxIdentifier('BLOCKS_Root')
          path.node.closingElement.name = t.jsxIdentifier('BLOCKS_Root')
        }
      }
    }
  }
}
