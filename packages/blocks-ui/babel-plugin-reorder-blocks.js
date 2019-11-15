export default (api, { destination, source }) => {
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

        const children = path.node.children.filter(node => t.isJSXElement(node))
        const [removed] = children.splice(source.index, 1)
        children.splice(destination.index, 0, removed)
        path.node.children = children
      }
    }
  }
}
