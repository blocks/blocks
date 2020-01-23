import { transform } from '@babel/standalone'
import babelPluginSyntaxJsx from '@babel/plugin-syntax-jsx'

export const testPlugin = (plugin, src) =>
  transform(src, {
    plugins: [babelPluginSyntaxJsx, plugin]
  }).code.replace(/;$/, '')
