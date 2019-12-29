/** @jsx jsx */
import { useState, useEffect, useMemo } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Styled, jsx } from 'theme-ui'
import { system as systemTheme } from '@theme-ui/presets'

import * as DEFAULT_BLOCKS from '@blocks/react'

import * as themeComponents from '@theme-ui/components'

import * as transforms from './transforms'
import * as queries from './queries'

import { useEditor } from './editor-context'
import pragma from './pragma'

import Header from './header'
import Canvas from './canvas'
import Layout from './layout'
import SidePanel from './side-panel'
import Tree from './tree'

// blocks app theme
const appTheme = {
  ...systemTheme,
  colors: {
    ...systemTheme.colors,
    border: '#e1e6eb'
  },
  styles: {
    ...systemTheme.styles,
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

const BLOCKS_Droppable = props => {
  const { mode } = useEditor()
  return <Droppable isDropDisabled={mode === 'viewports'} {...props} />
}

const BLOCKS_Draggable = ({ active, children, ...props }) => {
  const { mode } = useEditor()
  return (
    <Draggable isDragDisabled={mode === 'viewports'} {...props}>
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

const defaultTheme = {
  ...systemTheme,
  breakpoints: [360, 600, 1024]
}

export default ({
  src: initialCode,
  blocks: providedBlocks,
  onChange,
  layout = 'div'
}) => {
  const [code, setCode] = useState(null)
  const [rawCode, setRawCode] = useState(null)
  const [transformedCode, setTransformedCode] = useState(null)
  const [elementId, setElementId] = useState(null)
  const [elementData, setElementData] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [srcBlocks, setSrcBlocks] = useState([])
  const [theme, setTheme] = useState(defaultTheme)
  const elementTree = useMemo(() => queries.getElementTree(code), [code])
  console.log('element tree:', elementTree)

  const blocks = providedBlocks ? providedBlocks : DEFAULT_BLOCKS

  const scope = {
    Blocks: DEFAULT_BLOCKS.Blocks,
    Styled,
    Link: Styled.a,
    jsx: pragma(setElementId),
    BLOCKS_Droppable: props => <BLOCKS_Droppable {...props} />,
    BLOCKS_Draggable: props => (
      <BLOCKS_Draggable active={props.draggableId === elementId} {...props} />
    ),
    BLOCKS_DraggableInner: props => <div {...props} />,
    BLOCKS_DroppableInner: props => <div {...props} />,
    BLOCKS_Text: props => <span {...props} />,
    ...themeComponents,
    ...blocks,
    BLOCKS_Layout: layout
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
      const newRawCode = transforms.toRawJSX(code, { blocks: srcBlocks })
      const newSrcBlocks = queries.getBlocks(code)

      setRawCode(newRawCode)
      setSrcBlocks(newSrcBlocks)

      if (newTransformedCode) {
        setTransformedCode(newTransformedCode)
      }

      if (newRawCode) {
        onChange(newRawCode)
      }
    } catch (e) {
      console.error(e)
    }
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
      const newCode = transforms.insertJSXBlock(code, { ...drag, blocks })
      setCode(newCode)
    } else if (drag.source.droppableId.startsWith('element-')) {
      console.log(drag)
    } else {
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

  return (
    <Layout elementData={elementData} theme={appTheme}>
      <Header />
      <DragDropContext
        onDragEnd={onDragEnd}
        onBeforeDragStart={onBeforeDragStart}
      >
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr 400px',
            height: 'calc(100vh - 43px)'
          }}
        >
          <div
            sx={{
              height: '100%',
              py: 2,
              overflow: 'auto',
              borderRight: '1px solid',
              borderColor: 'border'
            }}
          >
            {elementTree.children.map(child => (
              <Tree
                key={child.id}
                tree={child}
                depth={0}
                selectedId={elementData ? elementData.id : ''}
                onSelect={id => setElementId(id)}
              />
            ))}
          </div>
          <Canvas
            code={rawCode}
            transformedCode={transformedCode}
            scope={scope}
            theme={theme}
          />
          <SidePanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            blocks={blocks}
            srcBlocks={srcBlocks}
            theme={theme}
            setTheme={setTheme}
            elementData={elementData}
            handleChange={handleChange}
            handlePropChange={handlePropChange}
            handleRemove={handleRemove}
            handleRemoveElement={handleRemoveElement}
            handleParentSelect={handleParentSelect}
            handleInsertElement={handleInsertElement}
            handleClone={handleClone}
            handleTextUpdate={handleTextUpdate}
            setElementId={setElementId}
          />
        </div>
      </DragDropContext>
    </Layout>
  )
}
