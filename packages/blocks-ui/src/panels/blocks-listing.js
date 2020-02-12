/** @jsx jsx */
import { useMemo } from 'react'
import { Droppable, Draggable } from '@blocks/react-beautiful-dnd'
import { jsx, ThemeProvider } from 'theme-ui'
import { Box } from '@theme-ui/components'

import InlineBlockRender from '../inline-block-render'
import { useEditor } from '../providers/editor'
import { useBlocks } from '../providers/blocks'
import { useScope } from '../providers/scope'
import { useCanvas } from '../providers/canvas'

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

  return (
    <Box p={3}>
      <ThemeProvider theme={theme}>
        <Droppable isDropDisabled droppableId="components">
          {(provided, _snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {list}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </ThemeProvider>
    </Box>
  )
}
