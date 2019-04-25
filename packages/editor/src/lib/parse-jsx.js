// utilities for parsing jsx block strings from MDX into slate schema
const babel = require('@babel/core')
const { declare } = require('@babel/helper-plugin-utils')
const plugins = [require('@babel/plugin-syntax-jsx')]

class PluginGetRootElement {
  constructor() {
    const result = {
      props: {}
    }
    this.result = result

    this.plugin = declare(babel => {
      babel.assertVersion(7)

      const visitProps = {
        JSXAttribute(path) {
          const key = path.node.name.name
          // only handles string/static props
          const value = path.node.value.value
          result.props[key] = value
        }
      }

      return {
        visitor: {
          JSXOpeningElement(path) {
            // only parse root-level element
            if (result.name) return
            result.name = path.node.name.name
            path.traverse(visitProps)
          }
        }
      }
    })
  }
}

module.exports.parseJSXBlock = jsx => {
  const { plugin, result } = new PluginGetRootElement()
  babel.transformSync(jsx, {
    plugins: [...plugins, plugin]
  })
  const { name, props } = result
  return {
    name,
    props
  }
}

function pluginApplyProps(babel, state) {
  let applied = false
  const { types: t } = babel

  const addProps = (path, opts) => {
    const { props = {} } = opts
    for (const key in props) {
      const value = props[key]
      const id = t.jSXIdentifier(key)
      const attribute = t.jSXAttribute(id, t.stringLiteral(value))
      const index = path.node.attributes.findIndex(
        attr => attr.name.name === key
      )
      if (index < 0) {
        path.node.attributes.push(attribute)
      } else {
        path.node.attributes[index] = attribute
      }
    }
  }

  const visitor = {
    JSXOpeningElement(path, state) {
      // only apply props to root element
      if (applied) return
      addProps(path, state.opts)
      applied = true
    }
  }

  return {
    visitor
  }
}

module.exports.applyProps = (jsx, opts) => {
  const result = babel.transformSync(jsx, {
    plugins: [...plugins, [pluginApplyProps, opts]]
  })
  const next = result.code.replace(/;$/, '')
  return next
}
