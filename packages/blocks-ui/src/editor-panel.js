/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Label, Input, Flex } from '@theme-ui/components'
import { Trash, CornerRightUp, Copy, List } from 'react-feather'

import { IconButton } from './ui'

import TreeView from './tree-view'
import PropertyControlsPanel from './property-controls-panel'

// TODO: Fix this prop drilling dance for common editor
// interactions.
export default ({
  elementData,
  handleChange,
  handlePropChange,
  handleRemoveElement,
  handleParentSelect,
  handleClone,
  handleTextUpdate,
  setElementId,
  blocks
}) => {
  const keys = elementData.name.split('.')

  let block = blocks
  keys.forEach(key => {
    if (!block) {
      return {}
    }

    block = block[key]
  })

  const { propertyControls = {} } = block

  return (
    <div
      sx={{
        height: '100vh',
        overflow: 'scroll'
      }}
    >
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: 'thin solid #e1e6eb',
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
          <IconButton onClick={handleClone} aria-label="Copy element">
            <Copy size={17} />
          </IconButton>
          <IconButton onClick={handleRemoveElement} aria-label="Remove">
            <Trash size={18} />
          </IconButton>
          {elementData.parentId ? (
            <IconButton onClick={handleParentSelect} aria-label="Go to parent">
              <CornerRightUp size={18} />
            </IconButton>
          ) : (
            <IconButton onClick={handleParentSelect} aria-label="Go to parent">
              <List size={18} />
            </IconButton>
          )}
        </nav>
      </Flex>
      <TreeView children={elementData.children} onSelect={setElementId} />
      <PropertyControlsPanel
        elementData={elementData}
        propertyControls={propertyControls}
        onChange={handleChange}
        onPropChange={handlePropChange}
        onTextChange={handleTextUpdate}
      />
    </div>
  )
}
