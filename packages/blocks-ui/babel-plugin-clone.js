import { uuid } from './util'

export default (api, { elementId } = {}) => {
  const { types: t } = api

  return {
    visitor: {
      JSXOpeningElement(path) {
        const id = path.node.attributes.find(
          node => node && node.name && node.name.name === '___tuid'
        )

        if (!id || id.value.value !== elementId) {
          return
        }

        try {
          const element = path.parentPath
          const newElement = t.cloneDeep(element.node)
          const tuid = newElement.openingElement.attributes.find(
            node => node && node.name && node.name.name === '___tuid'
          )
          tuid.value = t.stringLiteral(uuid())
          element.insertBefore(newElement)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
}
