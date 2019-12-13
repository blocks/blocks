/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Flex } from '@theme-ui/components'
import { Trash, CornerRightUp, Copy, List } from 'react-feather'

import { IconButton } from '../ui'
import { useCode } from '../providers/code'
import { useBlocks } from '../providers/blocks'

import PropertyControlsPanel from './property-controls'

export default () => {
  const blocks = useBlocks()
  const {
    removeCurrentElement,
    cloneCurrentElement,
    updateProp,
    updateSxProp,
    insertText,
    selectParentOfCurrentElement,
    currentElementData: elementData
  } = useCode()

  const keys = elementData.name.split('.')

  let block = blocks
  keys.forEach(key => {
    if (!block) {
      return {}
    }

    block = block[key]
  })

  const { propertyControls = {} } = block || {}

  return (
    <div
      sx={{
        height: '100vh',
        overflow: 'auto'
      }}
    >
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'border',
          px: 3,
          py: 1
        }}
      >
        <h3
          sx={{
            fontSize: 1,
            fontWeight: 500,
            m: 0,
            lineHeight: 1
          }}
        >
          {elementData.name}
        </h3>
        <nav
          sx={{
            lineHeight: 1,
            aignItems: 'center'
          }}
        >
          <IconButton onClick={cloneCurrentElement} aria-label="Copy element">
            <Copy size={17} />
          </IconButton>
          <IconButton onClick={removeCurrentElement} aria-label="Remove">
            <Trash size={18} />
          </IconButton>
          {elementData.parentId ? (
            <IconButton
              onClick={selectParentOfCurrentElement}
              aria-label="Go to parent"
            >
              <CornerRightUp size={18} />
            </IconButton>
          ) : (
            <IconButton
              onClick={selectParentOfCurrentElement}
              aria-label="Go to parent"
            >
              <List size={18} />
            </IconButton>
          )}
        </nav>
      </Flex>
      <PropertyControlsPanel
        elementData={elementData}
        propertyControls={propertyControls}
        onPropChange={updateProp}
        onStyleChange={updateSxProp}
        onTextChange={insertText}
      />
    </div>
  )
}
