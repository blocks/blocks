/** @jsx jsx */
import React, { useMemo } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { jsx, ThemeProvider } from 'theme-ui'

import InlineBlockRender from './inline-block-render'

const isBlocksRoot = component =>
  component.Root && Object.keys(component).length === 1

export default ({ components, theme }) => {
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
                    m: 2,
                    border: 'thin solid #e1e6eb'
                  }}
                >
                  <InlineBlockRender
                    aria-label={key}
                    code={Component.usage}
                    scope={{
                      [key]: Component
                    }}
                  />
                </div>
              </div>
            )
          }}
        </Draggable>
      )
    })
  }, [components])

  return (
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
  )
}
