/** @jsx jsx */
import { useMemo } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { jsx, ThemeProvider } from 'theme-ui'
import { Box } from '@theme-ui/components'

import { useEditor } from './editor-context'
import InlineBlockRender from './inline-block-render'

const isBlocksRoot = component =>
  component.Root && Object.keys(component).length === 1

export default ({ components, theme }) => {
  const { mode } = useEditor()
  const list = useMemo(() => {
    return Object.keys(components).map((key, i) => {
      const Component = components[key]

      // Ignore Blocks.Root since it's a special component
      if (isBlocksRoot(Component)) {
        return null
      }

      return (
        <Draggable key={key} draggableId={key} index={i + 1}>
          {(provided, snapshot) => {
            const Component = components[key]

            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div
                  sx={{
                    border: 'thin solid #e1e6eb',
                    bg: 'background',
                    color: 'text',
                    mb: 3
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
  }, [components])

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
        <Droppable droppableId="components">
          {(provided, snapshot) => (
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
