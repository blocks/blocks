/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Styled, ThemeProvider, jsx } from 'theme-ui'
import { system } from '@theme-ui/presets'
import { Global } from '@emotion/core'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'

import {
  Label,
  Input
  // Select,
  // Textarea,
  // Radio,
  // Checkbox,
  // Slider
} from '@theme-ui/components'
import * as themeComponents from '@theme-ui/components'

import * as transforms from './transforms'
import * as queries from './queries'

import useDebounce from './use-debounce'

import * as recipes from './recipes'
import pragma from './pragma'
import CODE from './fixture'

import BlocksListing from './blocks-listing'
import InlineRender from './inline-render'

// TODO: Make this less hacky
import recipesSrc from 'raw-loader!./recipes.txt'

const theme = {
  ...system,
  styles: {
    ...system.styles,
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

const Blocks = {}
Blocks.Root = React.Fragment

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
                boxShadow: active ? 'inset 0px 0px 0px 2px #bbbbbb' : undefined,
                ':hover': { boxShadow: 'inset 0px 0px 0px 2px #0079FF' }
              }
            }
          },
          snapshot
        )
      }
    </Draggable>
  )
}

export default () => {
  const [code, setCode] = useState(null)
  const [transformedCode, setTransformedCode] = useState(null)
  const [elementId, setElementId] = useState(null)
  const [elementData, setElementData] = useState(null)
  const [components, setComponents] = useState(null)
  const [activeTab, setActiveTab] = useState(1)
  const [blocks, setBlocks] = useState([])

  const scope = {
    Blocks,
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
    ...recipes,
    ...themeComponents
  }

  useEffect(() => {
    const newCode = transforms.addTuid(CODE)
    setCode(newCode)

    const allBlocks = queries.getBlocks(newCode)
    setBlocks(allBlocks)

    const exportedElements = queries.getExportedElements(recipesSrc)
    setComponents(exportedElements)
  }, [])

  useEffect(() => {
    if (!elementId) {
      return
    }

    const newElementData = queries.getCurrentElement(code, elementId)
    setElementData(newElementData)

    const allBlocks = queries.getBlocks(code)
    setBlocks(allBlocks)

    if (newElementData) {
      setActiveTab(1)
    }
  }, [elementId, code])

  useEffect(() => {
    try {
      const newTransformedCode = transforms.toTransformedJSX(code)

      if (newTransformedCode) {
        setTransformedCode(newTransformedCode)
      }
    } catch (e) {}
  }, [code])

  if (!code || !transformedCode) {
    return null
  }

  const onDragEnd = drag => {
    if (!drag.destination) {
      return
    }

    if (drag.source.index === drag.destination.index) {
      return
    }

    if (drag.source.droppableId === 'components') {
      const newCode = transforms.insertJSXBlock(code, { ...drag, components })
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
    setElementId(null)
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

  const handleChange = key => e => {
    const sx = elementData.props.sx || {}
    sx[key] = e.target.value

    setElementData({ ...elementData, props: { ...elementData.props, sx } })

    const { code: newCode } = transforms.applySxProp(code, {
      elementId,
      key,
      value: e.target.value
    })

    setCode(newCode)
  }

  const handleParentSelect = () => {
    if (elementData.parentId) {
      setElementId(elementData.parentId)
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

  // console.log({ elementId, elementData, transformedCode })

  console.log('rerender')
  return (
    <ThemeProvider theme={theme}>
      <Styled.root>
        <Global
          styles={{
            '*': {
              boxSizing: 'border-box'
            },
            body: {
              margin: 0
            }
          }}
        />
        <div
          sx={{
            display: 'flex',
            width: '100%',
            py: 2,
            px: 3,
            borderBottom: 'thin solid #e1e6eb'
          }}
        >
          <img
            alt="Blocks logo"
            src="https://user-images.githubusercontent.com/1424573/61592179-e0fda080-ab8c-11e9-9109-166cc7c86b43.png"
            sx={{
              height: 20
            }}
          />
        </div>
        <DragDropContext
          onDragEnd={onDragEnd}
          onBeforeDragStart={onBeforeDragStart}
        >
          <div
            sx={{
              display: 'flex',
              width: '100%'
            }}
          >
            <div
              sx={{
                width: '60%',
                backgroundColor: 'white',
                height: '100vh',
                overflow: 'scroll'
              }}
            >
              <InlineRender scope={scope} code={transformedCode} />
            </div>
            <div
              sx={{
                borderLeft: 'thin solid #e1e6eb',
                width: '40%',
                height: '100vh',
                overflow: 'scroll'
              }}
            >
              <div
                sx={{
                  height: '100vh',
                  overflow: 'scroll',
                  order: 10
                }}
              >
                <Tabs index={activeTab} onChange={index => setActiveTab(index)}>
                  <TabList
                    sx={{
                      display: 'flex',
                      width: '100%'
                    }}
                  >
                    <Tab
                      sx={{
                        flex: 1,
                        appearance: 'none',
                        border: 0,
                        py: 2,
                        borderRight: 'thin solid #e1e6eb',
                        borderBottom:
                          activeTab === 0 ? 0 : 'thin solid #e1e6eb',
                        backgroundColor: activeTab === 0 ? null : '#fafafa'
                      }}
                    >
                      Components
                    </Tab>
                    <Tab
                      sx={{
                        flex: 1,
                        appearance: 'none',
                        border: 0,
                        py: 2,
                        borderBottom:
                          activeTab === 1 ? 0 : 'thin solid #e1e6eb',
                        backgroundColor: activeTab === 1 ? null : '#fafafa'
                      }}
                    >
                      Editor
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      {activeTab === 0 ? (
                        <BlocksListing components={recipes} />
                      ) : null}
                    </TabPanel>
                    <TabPanel>
                      <div
                        sx={{
                          height: '100vh',
                          overflow: 'scroll'
                        }}
                      >
                        {elementData ? (
                          <h3
                            sx={{
                              textTransform: 'uppercase',
                              fontSize: 2,
                              fontWeight: 600,
                              m: 0,
                              px: 3,
                              py: 1,
                              borderBottom: 'thin solid #e1e6eb'
                            }}
                          >
                            {elementData.name}
                            <button onClick={handleRemoveElement}>
                              Remove
                            </button>
                            <button onClick={handleInsertElement}>
                              Insert
                            </button>
                            <button onClick={handleClone}>Clone</button>
                            {elementData.parentId && (
                              <button onClick={handleParentSelect}>
                                Parent
                              </button>
                            )}
                          </h3>
                        ) : (
                          <ul>
                            {blocks.map(block => (
                              <li
                                key={block.id}
                                onClick={() => setElementId(block.id)}
                              >
                                {block.name}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div>
                          {elementData && (
                            <div sx={{ px: 3 }}>
                              {elementData.hasOwnProperty('text') && (
                                <React.Fragment>
                                  <Label>Text</Label>
                                  <Input
                                    sx={{
                                      display: 'block',
                                      width: '100%'
                                    }}
                                    onChange={handleTextUpdate}
                                    value={elementData.text}
                                  />
                                </React.Fragment>
                              )}
                              <h3
                                sx={{
                                  fontWeight: 'normal',
                                  m: 0,
                                  pb: 2,
                                  pt: 4
                                }}
                              >
                                Props
                              </h3>
                              {elementData.props.hasOwnProperty('to') && (
                                <React.Fragment>
                                  <Label>To</Label>
                                  <Input
                                    sx={{
                                      display: 'block',
                                      width: '100%'
                                    }}
                                    onChange={handlePropChange('to')}
                                    value={elementData.props.to || ''}
                                  />
                                </React.Fragment>
                              )}
                              <h3
                                sx={{
                                  fontWeight: 'normal',
                                  mt: 4,
                                  mb: 0,
                                  pt: 4,
                                  borderTop: 'thin solid'
                                }}
                              >
                                Styles
                              </h3>
                              {elementData.props.sx && (
                                <React.Fragment>
                                  <Label>Padding</Label>
                                  <Input
                                    sx={{
                                      display: 'block',
                                      width: '100%'
                                    }}
                                    onChange={handleChange('p')}
                                    value={elementData.props.sx.p}
                                  />
                                  <button onClick={handleRemove('p')}>
                                    Remove
                                  </button>
                                </React.Fragment>
                              )}
                              <React.Fragment>
                                <Label>Background</Label>
                                <Input
                                  sx={{
                                    display: 'block',
                                    width: '100%'
                                  }}
                                  onChange={handleChange('background')}
                                  value={
                                    elementData.props.sx &&
                                    elementData.props.sx.backgroundColor
                                  }
                                />
                                <button onClick={handleRemove('background')}>
                                  Remove
                                </button>
                              </React.Fragment>
                              <React.Fragment>
                                <Label>Color</Label>
                                <Input
                                  sx={{
                                    display: 'block',
                                    width: '100%'
                                  }}
                                  onChange={handleChange('color')}
                                  value={elementData.props.sx.color}
                                />
                                <button onClick={handleRemove('color')}>
                                  Remove
                                </button>
                              </React.Fragment>
                              <h3
                                sx={{
                                  fontWeight: 'normal',
                                  mt: 4,
                                  mb: 0,
                                  pt: 4,
                                  borderTop: 'thin solid'
                                }}
                              >
                                Variant
                              </h3>
                              {elementData.props.sx &&
                                elementData.props.sx.variant && (
                                  <React.Fragment>
                                    <Label>
                                      {elementData.props.sx.variant.replace(
                                        'styles.',
                                        ''
                                      )}
                                    </Label>
                                    <Input
                                      sx={{
                                        display: 'block',
                                        width: '100%'
                                      }}
                                      onChange={handleChange('variant')}
                                      value={elementData.props.sx.variant}
                                    />
                                  </React.Fragment>
                                )}
                              <pre>{JSON.stringify(elementData, null, 2)}</pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>
            </div>
          </div>
        </DragDropContext>
      </Styled.root>
    </ThemeProvider>
  )
}
