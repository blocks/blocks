import { toLiteral, getUuid } from '../util'

export default (api, { elementId, key, value } = {}) => {
  const { types: t } = api

  return {
    visitor: {
      JSXOpeningElement(path) {
        const id = getUuid(path.node)

        if (!id || id !== elementId) {
          return
        }

        const attr = path.node.attributes.find(
          node => node && node.name && node.name.name === key
        )

        if (attr) {
          attr.value = toLiteral(value)
        } else if (typeof value === 'number') {
          path.node.attributes.push(
            t.JSXAttribute(
              t.JSXIdentifier(key),
              t.jsxExpressionContainer(toLiteral(value))
            )
          )
        } else {
          path.node.attributes.push(
            t.JSXAttribute(t.JSXIdentifier(key), toLiteral(value))
          )
        }
      }
    }
  }
}
