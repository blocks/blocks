import { transform } from '@babel/standalone'
import babelPluginTransformJsx from '@babel/plugin-transform-react-jsx'
import babelPluginSyntaxJsx from '@babel/plugin-syntax-jsx'
import babelPluginSetDefaultExportToContainer from './babel-plugins/set-default-export-to-container'
import babelPluginAddTuid from './babel-plugins/add-tuid-prop'
import babelPluginRemoveNamedExports from './babel-plugins/remove-named-exports'
import babelPluginDnd from './babel-plugins/drag-and-drop'
import babelPluginRemoveTuid from './babel-plugins/remove-tuid'
import babelPluginReorderBlocks from './babel-plugins/reorder-blocks'
import babelPluginApplySxProp from './babel-plugins/apply-sx-prop'
import babelPluginApplyProp from './babel-plugins/apply-prop'
import babelPluginInjectBlocksRoot from './babel-plugins/inject-blocks-root'
import babelPluginRemoveImports from './babel-plugins/remove-imports'
import babelPluginRemoveSxProp from './babel-plugins/remove-sx-prop'
import babelPluginRemove from './babel-plugins/remove'
import babelPluginInsertBefore from './babel-plugins/insert-before'
import babelPluginInsertAfter from './babel-plugins/insert-after'
import babelPluginClone from './babel-plugins/clone'
import babelPluginInsertBlock from './babel-plugins/insert-block'
import babelPluginReplaceText from './babel-plugins/replace-text'

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
  try {
    return transform(code, {
      plugins: transformPlugins
    }).code
  } catch (e) {
    return null
  }
}

export const toTransformedBlockJSX = code => {
  const fullCode = 'export default () => ' + code.trim()

  try {
    return transform(fullCode, {
      plugins: [
        babelPluginRemoveImports,
        babelPluginSetDefaultExportToContainer,
        [
          babelPluginTransformJsx,
          {
            pragma: 'jsx'
          }
        ]
      ]
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

export const insertJSXBlock = (code, { blocks, ...drag }) => {
  const block = blocks[drag.draggableId]

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
