/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Flex } from '@theme-ui/components'
import { Trash, CornerRightUp, Copy, List } from 'react-feather'

import { useCode } from '../providers/code'
import { useBlocks } from '../providers/blocks'
import { IconButton } from '../ui'

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
            display: 'flex',
            aignItems: 'center'
          }}
        >
          <IconButton
            label="Copy element"
            onClick={cloneCurrentElement}
            icon={Copy}
          />
          <IconButton
            label="Remove element"
            onClick={removeCurrentElement}
            icon={Trash}
          />
          <IconButton
            label="Go to parent"
            onClick={selectParentOfCurrentElement}
            icon={elementData.parentId ? CornerRightUp : List}
          />
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
