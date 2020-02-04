/** @jsx jsx */
import { useState, useMemo, useRef, useEffect } from 'react'
import { useElementSize } from '../use-element-size'
import { Droppable, Draggable } from '@blocks/react-beautiful-dnd'
import { jsx, ThemeProvider } from 'theme-ui'
import { Box } from '@theme-ui/components'

import InlineBlockRender from '../inline-block-render'
import { useEditor } from '../providers/editor'
import { useBlocks } from '../providers/blocks'
import { useScope } from '../providers/scope'
import { useCanvas } from '../providers/canvas'

// used as a wrapper around like block types
const BlockSorting = ({ title, children }) => {
  const ref = useRef(null)
  const [toggle, setToggle] = useState(true)
  const { height } = useElementSize(ref)
  const [groupHeight, setGroupHeight] = useState('100%')
  useEffect(() => {
    setGroupHeight(height)
  }, [groupHeight])
  return (
    <div
      ref={ref}
      sx={{
        boxSizing: 'border-box',
        borderRadius: 4,
        width: '100%',
        border: '1px solid highlight',
        background: '#F6F6F6', // replace this with 'muted' once it's added to the theme
        padding: 3,
        marginBottom: 3,
        overflow: 'hidden',
        height: toggle ? groupHeight : 58,
        transition: 'height 0.5s ease-in-out'
      }}
    >
      <div
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 3,
          alignItems: 'center',
          ':hover': {
            cursor: 'pointer'
          }
        }}
        onClick={() => setToggle(!toggle)}
      >
        <h4
          sx={{
            margin: 0
          }}
        >
          <u>{title}</u> • {children.length}
        </h4>
        <span
          sx={{
            transform: toggle ? 'rotate(-0.5turn)' : 'rotate(0turn)',
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderBottom: '5px solid black',
            transition: 'transform 0.5s'
          }}
        />
      </div>
      {children}
    </div>
  )
}

const isBlocksRoot = component =>
  component.Root && Object.keys(component).length === 1

export default () => {
  const blocks = useBlocks()
  const { theme } = useScope()
  const { mode } = useEditor()
  const {
    canvasSize: { width }
  } = useCanvas()

  const list = useMemo(() => {
    return Object.keys(blocks).map((key, i) => {
      const Component = blocks[key]

      // Ignore Blocks.Root since it's a special component
      if (isBlocksRoot(Component)) {
        return null
      }

      return (
        <Draggable key={key} draggableId={key} index={i + 1}>
          {(provided, _snapshot) => {
            const Component = blocks[key]
            // gets element the block is currently hovering over on drag
            const currentlyHoveringOver = _snapshot.draggingOver

            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div
                  sx={{
                    border: '1px solid',
                    borderColor: 'border',
                    bg: 'background',
                    color: 'text',
                    mb: 3,
                    width:
                      currentlyHoveringOver === 'root' ? `${width}px` : '100%',
                    transition: 'width .25s',
                    pointerEvents: 'none'
                  }}
                >
                  <InlineBlockRender
                    aria-label={key}
                    code={Component.usage}
                    scope={{
                      [key]: Component
                    }}
                    name={key}
                  />
                </div>
              </div>
            )
          }}
        </Draggable>
      )
    })
  }, [blocks, width])

  if (mode === 'viewports') {
    return (
      <div sx={{ py: 64, textAlign: 'center' }}>
        Viewport mode does not work with components. <br /> Switch to{' '}
        <strong>canvas mode</strong> to add components.
      </div>
    )
  }

  // trims first key in arr as it's always null
  const trimmedList = list.slice(1)
  // we should be able to get these types dynamically. might need to change the naming structure to facilitate this.
  // example: HeaderBasic -> Header_Basic | HeaderLogo -> Header_Logo
  const groupTypes = ['Header', 'Quote', 'Tagline', 'Footer']
  // this is later used as the name for the group
  const getGroup = title => trimmedList.filter(block => block.key.match(title))
  // wouldn't mind getting this into a single pass with out filtering multiple times.
  const organizedList = groupTypes.map(type => getGroup(type))

  return (
    <Box p={3}>
      <ThemeProvider theme={theme}>
        <Droppable droppableId="components">
          {(provided, _snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {organizedList.map((blockGroup, i) => (
                <BlockSorting key={i} title={`${groupTypes[i]}s`}>
                  {blockGroup.map(block => block)}
                </BlockSorting>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </ThemeProvider>
    </Box>
  )
}
