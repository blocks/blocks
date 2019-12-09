import { uuidName } from '../constants'

export default (api, { elementId } = {}) => {
  return {
    visitor: {
      JSXOpeningElement(path) {
        const id = path.node.attributes.find(
          node => node && node.name && node.name.name === uuidName
        )

        if (!id || id.value.value !== elementId) {
          return
        }

        path.parentPath.remove()
      }
    }
  }
}
