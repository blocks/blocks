import React, { useState, useContext, useEffect } from 'react'
import { ControlType } from 'property-controls'

import * as queries from '../queries'
import * as transforms from '../transforms'
import { parseFieldValue } from '../util'

import { useBlocks } from './blocks'

const CodeContext = React.createContext({})

export const useCode = () => {
  const value = useContext(CodeContext)

  return value
}

const CodeProvider = ({ children, initialCode, onChange }) => {
  const providedBlocks = useBlocks()

  const codeWithUuids = transforms.addTuid(initialCode)
  const [codeState, setCodeState] = useState({
    currentElementId: null,
    currentElementData: null,
    currentHoveredElementId: null,
    currentHoveredElements: [],
    rawCode: initialCode,
    code: codeWithUuids,
    transformedCode: transforms.toTransformedJSX(codeWithUuids),
    tree: queries.getElementTree(codeWithUuids),
    blocks: queries.getBlocks(codeWithUuids)
  })

  useEffect(() => {
    onChange(transforms.toRawJSX(codeState.code))
  }, [codeState])

  const updateCode = newCode => {
    return {
      code: newCode,
      transformedCode: transforms.toTransformedJSX(newCode),
      tree: queries.getElementTree(newCode),
      blocks: queries.getBlocks(newCode)
    }
  }

  const editCode = rawCode => {
    const code = transforms.addTuid(rawCode)

    setCodeState({
      ...codeState,
      ...updateCode(code)
    })
  }

  const setCurrentElementId = elementId => {
    if (!elementId) {
      return setCodeState({
        ...codeState,
        currentElementId: null,
        currentElementData: null
      })
    }

    const currentElementData = queries.getCurrentElement(
      codeState.code,
      elementId
    )

    setCodeState({
      ...codeState,
      currentElementId: elementId,
      currentElementData
    })
  }

  const hoverElementId = elementId => {
    if (!elementId) {
      return
    }

    setCodeState(oldCodeState => ({
      ...oldCodeState,
      currentHoveredElementId: !elementId ? null : elementId,
      currentHoveredElements: [
        ...oldCodeState.currentHoveredElements,
        elementId
      ]
    }))
  }

  const removeHoveredElementId = elementId => {
    if (!elementId) {
      return
    }

    setCodeState(oldCodeState => {
      const newHoveredElements = oldCodeState.currentHoveredElements.filter(
        id => id !== elementId
      )

      return {
        ...oldCodeState,
        currentHoveredElementId:
          newHoveredElements.length > 0
            ? newHoveredElements[newHoveredElements.length - 1]
            : null,
        currentHoveredElements: newHoveredElements
      }
    })
  }

  const selectParentOfCurrentElement = () => {
    if (codeState.currentElementData.parentId) {
      setCurrentElementId(codeState.currentElementData.parentId)
    } else {
      setCurrentElementId(null)
    }
  }

  const cloneCurrentElement = () => {
    const { code } = transforms.cloneElement(codeState.code, {
      elementId: codeState.currentElementId
    })

    setCodeState({
      ...codeState,
      ...updateCode(code)
    })
  }

  const removeCurrentElement = () => {
    const { code } = transforms.removeElement(codeState.code, {
      elementId: codeState.currentElementId
    })

    const newCodeState = updateCode(code)
    const currentElementId = codeState.currentElementData.parentId
    setCodeState({
      ...codeState,
      ...newCodeState,
      currentElementId,
      currentElementData: queries.getCurrentElement(
        codeState.code,
        currentElementId
      )
    })
  }

  const insertText = e => {
    const text = e.target.value
    const currentElementData = { ...codeState.currentElementData, text }
    const { code } = transforms.replaceText(codeState.code, {
      text,
      elementId: codeState.currentElementId
    })

    setCodeState({
      ...codeState,
      ...updateCode(code),
      currentElementData
    })
  }

  const updateProp = (key, e, type = ControlType.String) => {
    const value = parseFieldValue(type, e)

    const currentElementData = {
      ...codeState.currentElementData,
      props: {
        ...codeState.currentElementData.props,
        [key]: value
      }
    }

    const { code } = transforms.applyProp(codeState.code, {
      elementId: codeState.currentElementId,
      key,
      value
    })

    setCodeState({
      ...codeState,
      ...updateCode(code),
      currentElementData
    })
  }

  const updateSxProp = newSx => {
    const sx = codeState.currentElementData.props.sx || {}

    const currentElementData = {
      ...codeState.currentElementData,
      props: { ...codeState.currentElementData.props, sx: { ...sx, ...newSx } }
    }

    const { code } = transforms.applySxProp(codeState.code, {
      elementId: codeState.currentElementId,
      sx: newSx
    })

    setCodeState({
      ...codeState,
      ...updateCode(code),
      currentElementData
    })
  }

  const onDragEnd = drag => {
    if (!drag.destination || drag.destination.droppableId === 'components') {
      return
    }

    if (
      drag.destination === 'root' &&
      drag.source.index === drag.destination.index
    ) {
      return
    }

    if (drag.source.droppableId === 'components') {
      const code = transforms.insertJSXBlock(codeState.code, {
        ...drag,
        blocks: providedBlocks
      })
      setCodeState({
        ...codeState,
        ...updateCode(code)
      })
    } else if (drag.source.droppableId.startsWith('element-')) {
      console.log(drag)
    } else {
      const code = transforms.reorderJSXBlocks(codeState.code, drag)
      setCodeState({
        ...codeState,
        ...updateCode(code)
      })
    }
  }

  const onBeforeDragStart = drag => {
    setCurrentElementId(drag.draggableId)
  }

  return (
    <CodeContext.Provider
      value={{
        ...codeState,
        insertText,
        updateProp,
        setCurrentElementId,
        removeCurrentElement,
        hoverElementId,
        removeHoveredElementId,
        cloneCurrentElement,
        selectParentOfCurrentElement,
        updateSxProp,
        onDragEnd,
        onBeforeDragStart,
        editCode
      }}
    >
      {children}
    </CodeContext.Provider>
  )
}

export default CodeProvider
