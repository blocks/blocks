/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Label, Input, Flex } from '@theme-ui/components'
import { Delete, CornerRightUp, Copy } from 'react-feather'

import { IconButton } from './ui'

import PropertyControlsPanel from './property-controls-panel'

const ChildrenSection = ({ children, onSelect }) => {
  if (!children || !children.length) {
    return null
  }

  return (
    <div
      sx={{
        borderBottom: 'thin solid #e1e6eb',
        backgroundColor: '#fafafa',
        p: 3,
        button: {
          mt: 2
        }
      }}
    >
      <h4
        sx={{
          m: 0,
          fontSize: 0,
          fontWeight: 500
        }}
      >
        Children
      </h4>
      {children.map(c => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          sx={{
            fontSize: 1,
            color: 'inherit',
            textDecoration: 'none',
            appearance: 'none',
            backgroundColor: 'background',
            borderRadius: 4,
            border: 'thin solid #e1e6eb',
            display: 'block',
            textAlign: 'left',
            width: '100%',
            px: 3,
            py: 2
          }}
        >
          {c.name}
        </button>
      ))}
    </div>
  )
}

// TODO: Fix this prop drilling dance for common editor
// interactions.
export default ({
  elementData,
  handleChange,
  handlePropChange,
  handleRemove,
  handleRemoveElement,
  handleParentSelect,
  handleClone,
  handleTextUpdate,
  setElementId,
  blocks = [] // TODO: Fix
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
          {elementData.parentId && (
            <IconButton onClick={handleParentSelect} aria-label="Go to parent">
              <CornerRightUp size={18} />
            </IconButton>
          )}
          <IconButton onClick={handleRemoveElement} aria-label="Remove">
            <Delete size={18} />
          </IconButton>
        </nav>
      </Flex>
      <ChildrenSection
        children={elementData.children}
        onSelect={setElementId}
      />
      <PropertyControlsPanel
        elementData={elementData}
        propertyControls={propertyControls}
        onChange={console.log}
      />
    </div>
  )
}
