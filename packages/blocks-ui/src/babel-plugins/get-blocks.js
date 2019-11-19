import { declare } from '@babel/helper-plugin-utils'
import { getElementName, getUuid } from '../util'

class BabelPluginGetBlocks {
  constructor() {
    this.state = { blocks: [] }

    this.plugin = declare(api => {
      api.assertVersion(7)
      const { types: t } = api

      return {
        visitor: {
          JSXElement: path => {
            const openingElement = path.node.openingElement

            if (t.isJSXMemberExpression(openingElement.name)) {
              const objectName =
                openingElement.name.object && openingElement.name.object.name
              const propertyName =
                openingElement.name.property &&
                openingElement.name.property.name

              if (objectName !== 'Blocks' && propertyName !== 'Root') {
                return
              }

              const children = path.node.children.filter(c => !t.isJSXText(c))

              children.map(child => {
                const id = getUuid(child.openingElement)
                const name = getElementName(child.openingElement)

                this.state.blocks.push({ id, name })
              })
            }
          }
        }
      }
    })
  }
}

export default BabelPluginGetBlocks
