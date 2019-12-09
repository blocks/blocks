import { toLiteral } from '../util'
import { uuidName } from '../constants'

// TODO: Accept the type of value from Controls
export default (api, { elementId, key, value } = {}) => {
  const { types: t } = api

  return {
    visitor: {
      JSXOpeningElement(path) {
        const id = path.node.attributes.find(
          node => node && node.name && node.name.name === uuidName
        )

        if (!id || id.value.value !== elementId) {
          return
        }

        const attr = path.node.attributes.find(
          node => node && node.name && node.name.name === key
        )

        // TODO: Handle the property control/type here. Not
        //       all props are string literals.
        if (attr) {
          attr.value = toLiteral(value)
        } else {
          path.node.attributes.push(
            t.JSXAttribute(t.JSXIdentifier(key), toLiteral(value))
          )
        }
      }
    }
  }
}
