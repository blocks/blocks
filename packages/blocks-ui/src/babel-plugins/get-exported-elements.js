import { declare } from '@babel/helper-plugin-utils'

class BabelPluginGetExportedElements {
  constructor() {
    this.state = { elements: {} }

    this.plugin = declare(api => {
      api.assertVersion(7)
      const { types: t } = api

      return {
        visitor: {
          ExportNamedDeclaration: path => {
            const {
              declaration: {
                declarations: [declaration]
              }
            } = path.node
            const el = declaration.init.body

            if (t.isJSXElement(el)) {
              const name = declaration.id.name
              this.state.elements[name] = el
            }
          }
        }
      }
    })
  }
}

export default BabelPluginGetExportedElements
