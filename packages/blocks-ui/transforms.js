import { transform } from '@babel/standalone'
import babelPluginTransformJsx from '@babel/plugin-transform-react-jsx'
import babelPluginSyntaxJsx from '@babel/plugin-syntax-jsx'
import babelPluginSetDefaultExportToContainer from './babel-plugin-set-default-export-to-container'
import babelPluginAddTuid from './babel-plugin-add-tuid-prop'
import babelPluginRemoveNamedExports from './babel-plugin-remove-named-exports'
import babelPluginDnd from './babel-plugin-dnd'
import babelPluginRemoveTuid from './babel-plugin-remove-tuid'
import babelPluginReorderBlocks from './babel-plugin-reorder-blocks'
import babelPluginApplySxProp from './babel-plugin-apply-sx-prop'
import babelPluginApplyProp from './babel-plugin-apply-prop'
import babelPluginInjectBlocksRoot from './babel-plugin-inject-blocks-root'
import babelPluginRemoveImports from './babel-plugin-remove-imports'
import babelPluginRemoveSxProp from './babel-plugin-remove-sx-prop'
import babelPluginRemove from './babel-plugin-remove'
import babelPluginInsertBefore from './babel-plugin-insert-before'
import babelPluginInsertAfter from './babel-plugin-insert-after'
import babelPluginClone from './babel-plugin-clone'
import babelPluginInsertBlock from './babel-plugin-insert-block'
import babelPluginReplaceText from './babel-plugin-replace-text'

const transformPlugins = [
  babelPluginSetDefaultExportToContainer,
  babelPluginDnd,
  babelPluginInjectBlocksRoot,
  babelPluginRemoveNamedExports,
  babelPluginRemoveImports,
  [
    babelPluginTransformJsx,
    {
      pragma: 'jsx'
    }
  ]
]

export const toTransformedJSX = code => {
  console.log('Transforming JSX')
  try {
    return transform(code, {
      plugins: transformPlugins
    }).code
  } catch (e) {
    return null
  }
}

export const toRawJSX = code => {
  try {
    return transform(code, {
      plugins: [babelPluginSyntaxJsx, babelPluginRemoveTuid]
    }).code
  } catch (e) {
    return null
  }
}

export const addTuid = code =>
  transform(code, {
    plugins: [babelPluginSyntaxJsx, babelPluginAddTuid]
  }).code

export const applySxProp = (code, options = {}) =>
  transform(code, {
    plugins: [babelPluginSyntaxJsx, [babelPluginApplySxProp, options]]
  })

export const removeSxProp = (code, options = {}) =>
  transform(code, {
    plugins: [babelPluginSyntaxJsx, [babelPluginRemoveSxProp, options]]
  })

export const cloneElement = (code, options = {}) =>
  transform(code, {
    plugins: [babelPluginSyntaxJsx, [babelPluginClone, options]]
  })

export const removeElement = (code, options = {}) =>
  transform(code, {
    plugins: [babelPluginSyntaxJsx, [babelPluginRemove, options]]
  })

export const replaceText = (code, options = {}) =>
  transform(code, {
    plugins: [babelPluginSyntaxJsx, [babelPluginReplaceText, options]]
  })

export const insertElementBefore = (code, options = {}) =>
  transform(code, {
    plugins: [babelPluginSyntaxJsx, [babelPluginInsertBefore, options]]
  })

export const insertElementAfter = (code, options = {}) =>
  transform(code, {
    plugins: [babelPluginSyntaxJsx, [babelPluginInsertAfter, options]]
  })

export const applyProp = (code, options = {}) =>
  transform(code, {
    plugins: [babelPluginSyntaxJsx, [babelPluginApplyProp, options]]
  })

export const reorderJSXBlocks = (code, drag) => {
  return transform(code, {
    plugins: [babelPluginSyntaxJsx, [babelPluginReorderBlocks, drag]]
  }).code
}

export const insertJSXBlock = (code, { components, ...drag }) => {
  const componentName = Object.keys(components)[drag.source.index - 1]
  const block = components[componentName]

  if (!block) {
    return
  }

  return transform(code, {
    plugins: [
      babelPluginSyntaxJsx,
      [babelPluginInsertBlock, { ...drag, block }],
      babelPluginAddTuid
    ]
  }).code
}
