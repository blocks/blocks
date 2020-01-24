import { transform } from '@babel/standalone'
import babelPluginSyntaxJsx from '@babel/plugin-syntax-jsx'

export const testPlugin = (plugin, src, opts = {}) => {
  return transform(src, {
    plugins: [babelPluginSyntaxJsx, [plugin, opts]]
  }).code.replace(/;$/, '')
}
