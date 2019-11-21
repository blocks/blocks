import template from '@babel/template'

export default (api, { destination, block }) => {
  const { types: t } = api

  if (!destination) {
    return {}
  }

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

        // TODO: Make this a util
        const blockAST = template.ast(block.usage, { plugins: ['jsx'] })
          .expression

        const children = path.node.children.filter(node => t.isJSXElement(node))
        children.splice(destination.index, 0, blockAST)
        path.node.children = children
      }
    }
  }
}
