import { transform } from '@babel/standalone'
import babelPluginSyntaxJsx from '@babel/plugin-syntax-jsx'
import BabelPluginGetBlocks from './babel-plugin-get-blocks'
import BabelPluginGetCurrentElement from './babel-plugin-get-current-element'
import BabelPluginGetExportedElements from './babel-plugin-get-exported-elements'

export const getExportedElements = code => {
  const plugin = new BabelPluginGetExportedElements()

  transform(code, {
    plugins: [babelPluginSyntaxJsx, plugin.plugin]
  })

  return plugin.state.elements
}

export const getBlocks = code => {
  const plugin = new BabelPluginGetBlocks()

  transform(code, {
    plugins: [babelPluginSyntaxJsx, plugin.plugin]
  })

  return plugin.state.blocks
}

export const getCurrentElement = (code, elementId) => {
  const plugin = new BabelPluginGetCurrentElement({ elementId })

  transform(code, {
    plugins: [babelPluginSyntaxJsx, [plugin.plugin, { elementId }]]
  })

  return plugin.state.element
}
