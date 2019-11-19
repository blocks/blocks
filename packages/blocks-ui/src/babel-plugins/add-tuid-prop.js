import { uuid } from '../util'

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

        const tuid = path.node.attributes.find(
          node => node.name && node.name.name === '___tuid'
        )

        if (tuid) {
          return
        }

        path.node.attributes.push(
          t.jSXAttribute(t.jSXIdentifier('___tuid'), t.stringLiteral(uuid()))
        )
      }
    }
  }
}
