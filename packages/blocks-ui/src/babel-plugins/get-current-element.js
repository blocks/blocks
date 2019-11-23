import { declare } from '@babel/helper-plugin-utils'
import * as t from '@babel/types'

import { textTrim, getElementName, getUuid } from '../util'

const getElementProps = (attributes = {}) => {
  const props = attributes.reduce((acc, curr) => {
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

  props.sx = props.sx || {}
  return props
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
      const { types: t } = api

      return {
        visitor: {
          JSXOpeningElement: path => {
            const id = path.node.attributes.find(
              node => node && node.name && node.name.name === '___tuid'
            )

            if (!id || id.value.value !== elementId) {
              return
            }

            const children = path.container.children || []
            const hasElements = children.some(n => !t.isJSXText(n))

            const element = {
              id: elementId,
              name: getElementName(path.node),
              props: getElementProps(path.node.attributes),
              parentId: getParentId(path)
            }

            if (hasElements) {
              element.children = children
                .map(c => {
                  if (t.isJSXText(c)) {
                    return
                  }

                  return {
                    id: getUuid(c.openingElement),
                    name: getElementName(c.openingElement)
                  }
                })
                .filter(Boolean)
            } else if (children.length) {
              element.text = children.map(n => textTrim(n.value)).join(' ')
            }

            this.state.element = element
          }
        }
      }
    })
  }
}

export default BabelPluginGetCurrentElement
