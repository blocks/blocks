import template from '@babel/template'

// TODO: Make this configurable for other "blocks packs"
const BLOCKS_IMPORT_SOURCE = '@blocks/blocks'

const isBlocksImport = node =>
  node.source && node.source.extra.rawValue === BLOCKS_IMPORT_SOURCE

export default (_api, { blocks = [] }) => {
  return {
    visitor: {
      ImportDeclaration(path) {
        if (!isBlocksImport(path.node)) {
          return
        }

        if (blocks.length) {
          const imports = blocks.map(block => block.name).join(', ')
          const importAst = template.ast(
            `import {${imports}} from '${BLOCKS_IMPORT_SOURCE}'`
          )

          path.replaceWith(importAst)
          path.stop()
        } else {
          path.remove()
        }
      }
    }
  }
}
