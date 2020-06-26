import { toJSXAttribute, getUuid } from '../util'

export default (api, { elementId, key, value } = {}) => {
  return {
    visitor: {
      JSXOpeningElement(path) {
        const id = getUuid(path.node)

        if (!id || id !== elementId) {
          return
        }

        const newAttr = toJSXAttribute(api, key, value)

        const existingAttrIndex = path.node.attributes.findIndex(
          (node) => node && node.name && node.name.name === key
        )

        if (existingAttrIndex !== -1) {
          path.node.attributes[existingAttrIndex] = newAttr
        } else {
          path.node.attributes.push(newAttr)
        }
      }
    }
  }
}
