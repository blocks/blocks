/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Styled, jsx } from 'theme-ui'
import * as presets from '@theme-ui/presets'

import * as DEFAULT_BLOCKS from '@blocks/blocks/src'

import * as themeComponents from '@theme-ui/components'

import * as transforms from './transforms'
import * as queries from './queries'

import pragma from './pragma'

import Header from './header'
import Canvas from './canvas'
import Layout from './layout'
import SidePanel from './side-panel'

// blocks app theme
const appTheme = {
  ...presets.system,
  styles: {
    ...presets.system.styles,
    navlink: {
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 600
    }
  },
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      '&:hover': {
        bg: 'text'
      }
    },
    secondary: {
      color: 'text',
      bg: 'background',
      borderColor: 'text',
      border: 'thin solid'
    }
  }
}

const BLOCKS_Draggable = ({ active, children, ...props }) => {
  return (
    <Draggable {...props}>
      {(provided, snapshot) =>
        children(
          {
            ...provided,
            draggableProps: {
              ...provided.draggableProps,
              css: {
                boxShadow: active ? 'inset 0px 0px 0px 2px #0079FF' : undefined,
                ':hover': { boxShadow: 'inset 0px 0px 0px 2px #bbbbbb' },
                '&:focus': {
                  outline: 'none',
                  boxShadow: 'inset 0px 0px 0px 1px #4d9ef7'
                }
              }
            }
          },
          snapshot
        )
      }
    </Draggable>
  )
}

export default ({ src: initialCode, blocks: providedBlocks, onChange }) => {
  const [code, setCode] = useState(null)
  const [rawCode, setRawCode] = useState(null)
  const [transformedCode, setTransformedCode] = useState(null)
  const [elementId, setElementId] = useState(null)
  const [elementData, setElementData] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [themeName, setThemeName] = useState('system')
  const [srcBlocks, setSrcBlocks] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)

  const blocks = providedBlocks ? providedBlocks : DEFAULT_BLOCKS
  const theme = presets[themeName]

  const scope = {
    Blocks: DEFAULT_BLOCKS.Blocks,
    Styled,
    Link: Styled.a,
    jsx: pragma(setElementId),
    BLOCKS_Droppable: Droppable,
    BLOCKS_Draggable: props => (
      <BLOCKS_Draggable active={props.draggableId === elementId} {...props} />
    ),
    BLOCKS_DraggableInner: props => <div {...props} />,
    BLOCKS_DroppableInner: props => <div {...props} />,
    BLOCKS_Text: props => <span {...props} />,
    ...themeComponents,
    ...blocks
  }

  useEffect(() => {
    const newCode = transforms.addTuid(initialCode)
    setCode(newCode)
  }, [])

  useEffect(() => {
    if (!elementId) {
      return
    }

    const newElementData = queries.getCurrentElement(code, elementId)
    setElementData(newElementData)

    if (newElementData) {
      setActiveTab(0)
    }
  }, [elementId, code])

  useEffect(() => {
    try {
      const newTransformedCode = transforms.toTransformedJSX(code)
      const newRawCode = transforms.toRawJSX(code)
      const newSrcBlocks = queries.getBlocks(code)

      setRawCode(newRawCode)
      setSrcBlocks(newSrcBlocks)

      if (newTransformedCode) {
        setTransformedCode(newTransformedCode)
      }

      if (newRawCode) {
        onChange(newRawCode)
      }
    } catch (e) {}
  }, [code])

  if (!code || !transformedCode) {
    return null
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
      setIsEmpty(false)
      const newCode = transforms.insertJSXBlock(code, { ...drag, blocks })
      setCode(newCode)
    } else if (drag.source.droppableId.startsWith('element-')) {
      console.log(drag)
    } else {
      setIsEmpty(false)
      const newCode = transforms.reorderJSXBlocks(code, drag)
      setCode(newCode)
    }
  }

  const onBeforeDragStart = drag => {
    setElementId(drag.draggableId)
  }

  const handleRemove = key => () => {
    const sx = elementData.props.sx || {}
    delete sx[key]

    setElementData({ ...elementData, props: { ...elementData.props, sx } })

    const { code: newCode } = transforms.removeSxProp(code, { elementId, key })
    setCode(newCode)
  }

  const handleRemoveElement = () => {
    const { code: newCode } = transforms.removeElement(code, { elementId })
    setCode(newCode)
    if (elementData.parentId) {
      setElementId(elementData.parentId)
    } else {
      if (queries.getBlocks(code).length == 1) {
        setIsEmpty(true)
      }
      setElementId(null)
    }
    setElementData(null)
  }

  const handleClone = () => {
    const { code: newCode } = transforms.cloneElement(code, { elementId })
    setCode(newCode)
  }

  const handleInsertElement = () => {
    const { code: newCode } = transforms.insertElementAfter(code, { elementId })
    setIsEmpty(false)
    setCode(newCode)
  }

  const handleTextUpdate = e => {
    const text = e.target.value
    setElementData({ ...elementData, text })

    const { code: newCode } = transforms.replaceText(code, { text, elementId })
    setCode(newCode)
  }

  const handleChange = newSx => {
    const sx = elementData.props.sx || {}

    setElementData({
      ...elementData,
      props: { ...elementData.props, sx: { ...sx, ...newSx } }
    })

    const { code: newCode } = transforms.applySxProp(code, {
      elementId,
      sx: newSx
    })

    setIsEmpty(false)
    setCode(newCode)
  }

  const handleParentSelect = () => {
    if (elementData.parentId) {
      setElementId(elementData.parentId)
    } else {
      setElementId(null)
      setElementData(null)
    }
  }

  const handlePropChange = key => e => {
    setElementData({
      ...elementData,
      props: { ...elementData.props, [key]: e.target.value }
    })

    const { code: newCode } = transforms.applyProp(code, {
      elementId,
      key,
      value: e.target.value
    })

    setCode(newCode)
  }

  console.log(elementData)

  return (
    <Layout elementData={elementData} theme={theme}>
      <Header />
      <DragDropContext
        onDragEnd={onDragEnd}
        onBeforeDragStart={onBeforeDragStart}
      >
        <div
          sx={{
            display: 'flex'
          }}
        >
          <Canvas
            code={rawCode}
            transformedCode={transformedCode}
            scope={scope}
            theme={theme}
            isEmpty={isEmpty}
          />
          <SidePanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            blocks={blocks}
            srcBlocks={srcBlocks}
            theme={appTheme}
            themeName={themeName}
            elementData={elementData}
            handleChange={handleChange}
            handlePropChange={handlePropChange}
            handleRemove={handleRemove}
            handleRemoveElement={handleRemoveElement}
            handleParentSelect={handleParentSelect}
            handleInsertElement={handleInsertElement}
            handleClone={handleClone}
            handleTextUpdate={handleTextUpdate}
            setThemeName={setThemeName}
            setElementId={setElementId}
          />
        </div>
      </DragDropContext>
    </Layout>
  )
}
