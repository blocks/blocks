export default () => {
  return {
    visitor: {
      ExportNamedDeclaration(path) {
        const declaration = path.node.declaration

        // Ignore "export { Foo as default }" syntax for now
        if (declaration) {
          path.replaceWith(declaration)
        }
      }
    }
  }
}
