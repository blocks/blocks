export default () => {
  return {
    visitor: {
      JSXOpeningElement(path) {
        const name = path.node.name && path.node.name.name
        if (name !== 'BLOCKS_Text') {
          return
        }

        path.parentPath.replaceWith(path.container.children[0])
      }
    }
  }
}
