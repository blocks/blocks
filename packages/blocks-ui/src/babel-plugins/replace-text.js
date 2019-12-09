import { uuidName } from '../constants'

export default (api, { elementId, text } = {}) => {
  const { types: t } = api

  return {
    visitor: {
      JSXOpeningElement(path) {
        const id = path.node.attributes.find(
          node => node && node.name && node.name.name === uuidName
        )

        if (!id || id.value.value !== elementId) {
          return
        }

        path.container.children = [t.JSXText(text)]
      }
    }
  }
}
