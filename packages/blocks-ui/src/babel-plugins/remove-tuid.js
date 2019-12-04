import { uuidName } from '../constants'

export default () => {
  return {
    visitor: {
      JSXOpeningElement(path) {
        // Don't add UUIDs to internal blocks elements. For now we'll
        // prefix them with BLOCKS_
        const name = path.node.name && path.node.name.name
        if (name && name.startsWith('BLOCKS_')) {
          return
        }

        const attributesWithoutUuid = path.node.attributes.filter(
          node => node.name && node.name.name !== uuidName
        )
        path.node.attributes = attributesWithoutUuid
      }
    }
  }
}
