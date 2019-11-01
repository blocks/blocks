import { declare } from '@babel/helper-plugin-utils'
import * as t from '@babel/types'

const getElementName = node => {
  const elementName = node.name

  if (t.isJSXMemberExpression(elementName)) {
    return [elementName.object.name, elementName.property.name].join('.')
  } else {
    return elementName.name
  }
}

const getElementProps = (attributes = {}) => {
  return attributes.reduce((acc, curr) => {
    let value = null

    if (curr.value.value) {
      value = curr.value.value
    } else if (t.isJSXExpressionContainer(curr.value)) {
      value = curr.value.expression.properties.reduce((acc, curr) => {
        acc[curr.key.name] = curr.value.value
        return acc
      }, {})
    } else {
      //debugger
    }

    acc[curr.name.name] = value
    return acc
  }, {})
}

const getParentId = node => {
  const parent = node.parentPath.parentPath.node
  const openingElement = parent && parent.openingElement

  if (!openingElement) {
    return null
  }

  const id = openingElement.attributes.find(
    node => node && node.name && node.name.name === '___tuid'
  )

  return id && id.value && id.value.value
}

class BabelPluginGetCurrentElement {
  constructor() {
    this.state = { element: null }

    this.plugin = declare((api, { elementId }) => {
      api.assertVersion(7)

      return {
        visitor: {
          JSXOpeningElement: path => {
            const id = path.node.attributes.find(
              node => node && node.name && node.name.name === '___tuid'
            )

            if (!id || id.value.value !== elementId) {
              return
            }

            this.state.element = {
              id: elementId,
              name: getElementName(path.node),
              props: getElementProps(path.node.attributes),
              parentId: getParentId(path)
            }
          }
        }
      }
    })
  }
}

export default BabelPluginGetCurrentElement
