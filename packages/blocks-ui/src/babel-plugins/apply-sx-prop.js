import { toLiteral } from '../util'
import { uuidName } from '../constants'

export default (api, { elementId, sx }) => {
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

        Object.entries(sx).forEach(([key, value]) => {
          const sxProp = path.node.attributes.find(
            node => node && node.name && node.name.name === 'sx'
          )

          if (typeof value === 'undefined') {
            return
          }

          if (!sxProp) {
            path.node.attributes.push(
              t.jSXAttribute(
                t.jSXIdentifier('sx'),
                t.jsxExpressionContainer(
                  t.objectExpression([
                    t.objectProperty(t.identifier(key), toLiteral(value))
                  ])
                )
              )
            )
          } else {
            const existingProp = sxProp.value.expression.properties.find(
              node => node.key.name === key
            )

            if (existingProp) {
              existingProp.value = toLiteral(value)
              return
            }

            sxProp.value.expression.properties.push(
              t.objectProperty(t.identifier(key), toLiteral(value))
            )
          }
        })
      }
    }
  }
}
