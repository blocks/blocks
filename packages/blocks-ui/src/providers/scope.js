import React, { useContext } from 'react'
import { Droppable, Draggable } from '@blocks/react-beautiful-dnd'
import { Blocks } from '@blocks/react'
import * as themeComponents from '@theme-ui/components'
import { Styled } from 'theme-ui'

import jsx from '../pragma'

import { useEditor } from './editor'
import { useBlocks } from './blocks'
import { useThemeEditor } from './theme-editor'

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

const BLOCKS_DroppableInner = props => <div {...props} />
const BLOCKS_DraggableInner = props => <div {...props} />

const DEFAULT_SCOPE = {
  ...themeComponents,
  Blocks,
  Styled,
  Link: Styled.a,
  jsx,
  BLOCKS_Droppable,
  BLOCKS_Draggable,
  BLOCKS_DraggableInner,
  BLOCKS_DroppableInner
}

const ScopeContext = React.createContext({})

export const useScope = () => {
  const scope = useContext(ScopeContext)
  return scope
}

const ScopeProvider = ({ scope, children }) => {
  const blocks = useBlocks()
  const { update, ...theme } = useThemeEditor()

  const fullScope = {
    BLOCKS_Layout: scope.layout,
    ...DEFAULT_SCOPE,
    ...scope,
    ...blocks,
    theme
  }

  return (
    <ScopeContext.Provider value={fullScope}>{children}</ScopeContext.Provider>
  )
}

export default ScopeProvider
