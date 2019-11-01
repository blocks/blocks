export default () => {
  return {
    visitor: {
      JSXOpeningElement(path) {
        // Don't add UUIDs to internal blocks elements. For now we'll
        // prefix them with BLOCKS_
        const name = path.node.name && path.node.name.name
        if (name !== 'BLOCKS_Text') {
          return
        }

        //console.log(path)
        path.parentPath.replaceWith(path.container.children[0])
      }
    }
  }
}
