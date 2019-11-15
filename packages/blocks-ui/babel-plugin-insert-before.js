import template from '@babel/template'

export default (_, { elementId } = {}) => {
  const ast = template.ast(`<h1>hello!</h1>`, {
    plugins: ['jsx']
  })

  return {
    visitor: {
      JSXOpeningElement(path) {
        const id = path.node.attributes.find(
          node => node && node.name && node.name.name === '___tuid'
        )

        if (!id || id.value.value !== elementId) {
          return
        }

        path.parentPath.insertBefore(ast.expression)
      }
    }
  }
}
