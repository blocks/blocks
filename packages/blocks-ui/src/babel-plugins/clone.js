import traverse from '@babel/traverse'

import { uuid, getUuid, getUuidAttr, addUuidAttr } from '../util'

export default (api, { elementId } = {}) => {
  const { types: t } = api

  return {
    visitor: {
      JSXOpeningElement(path) {
        const id = getUuid(path.node)

        if (!id || id !== elementId) {
          return
        }

        try {
          const element = path.parentPath
          const newElement = t.cloneDeep(element.node)

          // We've found our element and will be cloning, so we can stop all new traversing.
          element.stop()

          // Manually run uuid prop adding to the newly created element to ensure that existing
          // uuids from cloned children are updated.
          traverse(
            newElement,
            {
              JSXOpeningElement(path) {
                const id = getUuidAttr(path.node)

                if (id) {
                  id.value = t.stringLiteral(uuid())
                } else {
                  addUuidAttr(path.node)
                }
              }
            },
            path.scope,
            path.state,
            path
          )

          element.insertAfter(newElement)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
}
