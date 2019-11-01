import template from '@babel/template'

export default api => {
  return {
    visitor: {
      JSXText(path) {
        const openingElement = path.parentPath.node.openingElement
        if (openingElement.name.name === 'BLOCKS_Text') {
          return
        }

        const { expression: wrapper } = template.ast(
          `
          <BLOCKS_Text></BLOCKS_Text>
        `,
          {
            plugins: ['jsx']
          }
        )

        //wrapper.children = [path.node]
        //path.replaceWith(wrapper)
      }
    }
  }
}
