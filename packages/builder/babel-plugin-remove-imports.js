export default () => {
  return {
    visitor: {
      ImportDeclaration(path) {
        path.remove()
      }
    }
  }
}
