import { declare } from '@babel/helper-plugin-utils'

class BabelPluginGetBlocksUsage {
  constructor() {
    this.state = { usage: null }

    this.plugin = declare(api => {
      api.assertVersion(7)
      const { types: t } = api

      return {
        visitor: {
          ExportDefaultDeclaration: (path, { file }) => {
            const { body } = file.ast.program

            const name = path.node.declaration.name
            const usage = body.find(node => {
              if (!node.expression || !node.expression.left) {
                return false
              }

              return (
                t.isExpressionStatement(node) &&
                node.expression.left.object.name === name &&
                node.expression.left.property.name === 'usage'
              )
            })

            if (usage) {
              this.state.usage = usage.expression.right.quasis[0].value.raw
            }
          }
        }
      }
    })
  }
}

export default BabelPluginGetBlocksUsage
