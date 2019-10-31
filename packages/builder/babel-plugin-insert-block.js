import template from '@babel/template'

const newBlock = template.ast(
  `
  <h1>Hello, world!</h1>
`,
  {
    plugins: ['jsx']
  }
).expression

export default (api, { destination }) => {
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
        children.splice(destination.index, 0, newBlock)
        path.node.children = children
      }
    }
  }
}
