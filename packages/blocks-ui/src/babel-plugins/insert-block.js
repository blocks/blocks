import template from '@babel/template'

const blockError = (name, message) =>
  `
  <div
    sx={{
      p: 2
    }}
  >
    <span
      sx={{
        fontSize: 2
      }}
    >
      Failed to compile ${name}
    </span>

    <pre
      sx={{
        mb: 0,
        backgroundColor: 'rgba(206, 17, 38, 0.05)',
        fontSize: '8pt'
      }}
    >
      {'${JSON.stringify(message)}'}
    </pre>
  </div>
`

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
        let blockAST
        try {
          blockAST = template.ast(block.usage, { plugins: ['jsx'] }).expression
        } catch (e) {
          blockAST = template.ast(blockError(block.name, e.message), {
            plugins: ['jsx']
          }).expression
        }

        const children = path.node.children.filter(node => t.isJSXElement(node))
        children.splice(destination.index, 0, blockAST)
        path.node.children = children
      }
    }
  }
}
