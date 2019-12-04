import { uuid, isBlocksRootElement } from '../util'
import { uuidName } from '../constants'

export default api => {
  const { types: t } = api

  return {
    visitor: {
      JSXOpeningElement(path) {
        // Don't add UUIDs to internal blocks elements. For now we'll
        // prefix them with BLOCKS_
        const name = path.node.name && path.node.name.name
        if (name && name.startsWith('BLOCKS_')) {
          return
        }

        if (isBlocksRootElement(path.node)) {
          return
        }

        const tuid = path.node.attributes.find(
          node => node.name && node.name.name === uuidName
        )

        if (tuid) {
          return
        }

        path.node.attributes.push(
          t.jSXAttribute(t.jSXIdentifier(uuidName), t.stringLiteral(uuid()))
        )
      }
    }
  }
}
