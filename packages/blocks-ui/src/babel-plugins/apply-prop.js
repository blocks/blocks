// TODO: Accept the type of value from Controls
export default (api, { elementId, key, value } = {}) => {
  const { types: t } = api

  return {
    visitor: {
      JSXOpeningElement(path) {
        const id = path.node.attributes.find(
          node => node && node.name && node.name.name === '___tuid'
        )

        if (!id || id.value.value !== elementId) {
          return
        }

        const attr = path.node.attributes.find(
          node => node && node.name && node.name.name === key
        )

        if (attr) {
          attr.value = t.stringLiteral(value)
        } else {
          //attr.value = t.stringLiteral(value)
        }
      }
    }
  }
}
