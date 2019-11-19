export default (api, { elementId, key }) => {
  return {
    visitor: {
      JSXOpeningElement(path) {
        const id = path.node.attributes.find(
          node => node && node.name && node.name.name === '___tuid'
        )

        if (!id || id.value.value !== elementId) {
          return
        }

        const sxProp = path.node.attributes.find(
          node => node && node.name && node.name.name === 'sx'
        )

        if (!sxProp) {
          return
        }

        sxProp.value.expression.properties.filter(n => n.key.name !== key)
      }
    }
  }
}
