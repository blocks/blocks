import React from 'react'
import { Block } from 'slate'
import { Styled } from 'theme-ui'
import { getTypeFromMarkdown } from '../lib/util'

const handleSpace = (event, editor, next) => {
  const { value } = editor
  const { selection, startBlock } = value

  const { start } = selection
  // TODO: Make this a util
  const chars = startBlock.text.slice(0, start.offset).replace(/\s*/g, '')
  const type = getTypeFromMarkdown(chars)

  // Not a type that we care about, move along
  if (type !== 'list-item') {
    return next()
  }

  // We don't want to add the space that triggers the shortcut
  event.preventDefault()

  return editor
    .unwrapBlock('paragraph') // Remove outer paragraph
    .wrapBlock('bulleted-list') // Then wrap in bulleted-list
    .wrapBlock(type) // Set direct block to list-item
    .setBlocks('paragraph') // Wrap in paragraph for remark
    .moveFocusToStartOfNode(startBlock) // Delete markdown shortcut
    .delete()
}

const handleBackspace = (_event, editor, next) => {
  const { value } = editor
  const { selection, startBlock, document } = value

  // We're not at the beginning of the line or there's highlighted text, move along
  if (selection.isExpanded || selection.start.offset !== 0) {
    return next()
  }

  // List items have an inner paragraph so we need to reach the parent
  // block to determine type.
  const parent = document.getParent(startBlock.key)

  // Not a type we care about, move along
  if (parent.type !== 'list-item') {
    return next()
  }

  // Check for other list items by stepping out into bulleted-list
  const outerParent = document.getParent(parent.key)

  // There's only a single list item so let's remove the entire list
  if (outerParent.getBlocks() === 1) {
    return editor.unwrapBlock('list-item').unwrapBlock('bulleted-list')
  }

  return editor.unwrapBlock('list-item').removeNodeByKey(startBlock.key)
}

const handleEnter = (event, editor, next) => {
  const { value } = editor
  const { selection, startBlock, document } = value

  if (selection.isExpanded) {
    return next()
  }

  // List items have an inner paragraph so we need to reach the parent
  // block to determine type
  const parent = document.getParent(startBlock.key)

  // Not a type we care about, move along
  if (parent.type !== 'list-item') {
    return next()
  }

  // Enter was pressed with no content
  if (selection.start.offset === 0 && startBlock.text.length === 0) {
    return editor.unwrapBlock('list-item').unwrapBlock('bulleted-list')
  }

  // Split at a depth of 2 to account for list-item > paragraph structure
  return editor.splitBlock(2)
}

const handleTab = (event, editor, next) => {
  // TODO: Handle indent/dedent lists
  return next()
}

const handleSpace = (event, editor, next) => {
  const { value } = editor
  const { selection, startBlock } = value

  const { start } = selection
  // TODO: Make this a util
  const chars = startBlock.text.slice(0, start.offset).replace(/\s*/g, '')
  const type = getTypeFromMarkdown(chars)

  // Not a type that we care about, move along
  if (type !== 'list-item') {
    return next()
  }

  // We don't want to add the space that triggers the shortcut
  event.preventDefault()

  return editor
    .unwrapBlock('paragraph') // Remove outer paragraph
    .wrapBlock('bulleted-list') // Then wrap in bulleted-list
    .wrapBlock(type) // Set direct block to list-item
    .setBlocks('paragraph') // Wrap in paragraph for remark
    .moveFocusToStartOfNode(startBlock) // Delete markdown shortcut
    .delete()
}

const handleBackspace = (event, editor, next) => {
  const { value } = editor
  const { selection, startBlock, document } = value

  // We're not at the beginning of the line or there's highlighted text, move along
  if (selection.isExpanded || selection.start.offset !== 0) {
    return next()
  }

  // List items have an inner paragraph so we need to reach the parent
  // block to determine type.
  const parent = document.getParent(startBlock.key)

  // Not a type we care about, move along
  if (parent.type !== 'list-item') {
    return next()
  }

  // Check for other list items by stepping out into bulleted-list
  const outerParent = document.getParent(parent.key)

  // There's only a single list item so let's remove the entire list
  if (outerParent.getBlocks() === 1) {
    return editor.unwrapBlock('list-item').unwrapBlock('bulleted-list')
  }

  return editor.unwrapBlock('list-item').removeNodeByKey(startBlock.key)
}

const handleEnter = (event, editor, next) => {
  const { value } = editor
  const { selection, startBlock, document } = value

  if (selection.isExpanded) {
    return next()
  }

  // List items have an inner paragraph so we need to reach the parent
  // block to determine type
  const parent = document.getParent(startBlock.key)

  // Not a type we care about, move along
  if (parent.type !== 'list-item') {
    return next()
  }

  // Enter was pressed with no content
  if (selection.start.offset === 0 && startBlock.text.length === 0) {
    return editor.unwrapBlock('list-item').unwrapBlock('bulleted-list')
  }

  // Split at a depth of 2 to account for list-item > paragraph structure
  return editor.splitBlock(2)
}

const handleTab = (event, editor, next) => {
  // TODO: Handle indent/dedent lists
  return next()
}

export default () => ({
  renderNode: (props, _editor, next) => {
    const { node, children } = props

    switch (node.type) {
      case 'bulleted-list':
        return <Styled.ul>{children}</Styled.ul>
      case 'list-item':
        return <Styled.ol>{children}</Styled.ol>
      default:
        return next()
    }
  },

  onKeyDown: (event, editor, next) => {
    switch (event.key) {
      case ' ':
        return handleSpace(event, editor, next)
      case 'Backspace':
        return handleBackspace(event, editor, next)
      case 'Enter':
        return handleEnter(event, editor, next)
      case 'Tab':
        return handleTab(event, editor, next)
      default:
        return next()
    }
  }
})
