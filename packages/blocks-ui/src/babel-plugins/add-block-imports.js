import template from '@babel/template'

import { uniq } from '../util'

// TODO: Make this configurable for other "blocks packs"
const BLOCKS_IMPORT_SOURCE = '@blocks/react'

const isBlocksImport = node =>
  node.source && node.source.extra.rawValue === BLOCKS_IMPORT_SOURCE

export default (_api, { blocks = [] }) => {
  return {
    visitor: {
      ImportDeclaration(path) {
        if (!isBlocksImport(path.node)) {
          return
        }

        const importNames = blocks.map(block => block.name)
        const allImports = uniq(['Blocks', ...importNames])

        if (blocks.length) {
          const imports = uniq(allImports).join(', ')
          const importAst = template.ast(
            `import {${imports}} from "${BLOCKS_IMPORT_SOURCE}"`
          )

          path.replaceWith(importAst)
          path.skip()
        } else {
          path.remove()
        }
      }
    }
  }
}
