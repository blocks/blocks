import { transform } from '@babel/standalone'
import babelPluginSyntaxJsx from '@babel/plugin-syntax-jsx'

import BabelPluginGetBlocks from './babel-plugins/get-blocks'
import BabelPluginGetBlocksUsage from './babel-plugins/get-blocks-usage'
import BabelPluginGetCurrentElement from './babel-plugins/get-current-element'
import BabelPluginGetExportedElements from './babel-plugins/get-exported-elements'
import BabelPluginGetElementTree from './babel-plugins/get-element-tree'

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

export const getBlocksUsage = code => {
  try {
    const plugin = new BabelPluginGetBlocksUsage()

    transform(code, {
      plugins: [babelPluginSyntaxJsx, plugin.plugin]
    })

    return plugin.state.usage
  } catch (e) {
    console.log(e)
  }
}

export const getCurrentElement = (code, elementId) => {
  const plugin = new BabelPluginGetCurrentElement()

  transform(code, {
    plugins: [babelPluginSyntaxJsx, [plugin.plugin, { elementId }]]
  })

  return plugin.state.element
}

export const getElementTree = code => {
  const plugin = new BabelPluginGetElementTree()

  transform(code, {
    plugins: [babelPluginSyntaxJsx, plugin.plugin]
  })

  return plugin.state.tree
}
