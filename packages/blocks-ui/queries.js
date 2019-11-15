import { transform } from '@babel/standalone'
import babelPluginSyntaxJsx from '@babel/plugin-syntax-jsx'
import BabelPluginGetCurrentElement from './babel-plugin-get-current-element'
import BabelPluginGetExportedElements from './babel-plugin-get-exported-elements'

export const getExportedElements = code => {
  const plugin = new BabelPluginGetExportedElements()

  transform(code, {
    plugins: [babelPluginSyntaxJsx, plugin.plugin]
  })

  return plugin.state.elements
}

export const getCurrentElement = (code, elementId) => {
  const plugin = new BabelPluginGetCurrentElement({ elementId })

  transform(code, {
    plugins: [babelPluginSyntaxJsx, [plugin.plugin, { elementId }]]
  })

  return plugin.state.element
}
