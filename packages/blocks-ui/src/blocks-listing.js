import React, { useMemo } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import InlineBlockRender from './inline-block-render'

export default ({ components }) => {
  const list = useMemo(() => {
    return Object.keys(components).map((key, i) => (
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
                  transform: 'scale(.6)'
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
    ))
  }, [components])

  return (
    <Droppable droppableId="components">
      {(provided, snapshot) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {list}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
