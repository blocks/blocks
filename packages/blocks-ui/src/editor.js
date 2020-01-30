/** @jsx jsx */
import { jsx } from 'theme-ui'
import { DragDropContext } from '@blocks/react-beautiful-dnd'

import appTheme from './theme'
import { Canvas } from './canvas'
import Layout from './layout'
import { headerHeight } from './header'
import SidePanel from './panels/side'
import TreePanel from './panels/tree'
import Providers from './providers'
import { useCode } from './providers/code'

const EditorGrid = props => (
  <div
    sx={{
      height: `calc(100vh - ${headerHeight}px)`,
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '260px 1fr 400px'
    }}
    {...props}
  />
)

const Editor = () => {
  const { onDragEnd, onBeforeDragStart } = useCode()

  return (
    <Layout>
      <DragDropContext
        onDragEnd={onDragEnd}
        onBeforeDragStart={onBeforeDragStart}
      >
        <EditorGrid>
          <TreePanel />
          <Canvas />
          <SidePanel />
        </EditorGrid>
      </DragDropContext>
    </Layout>
  )
}

const EditorWithProviders = ({
  src,
  blocks,
  theme,
  props = {},
  scope = {},
  layout = 'div',
  onChange = () => {}
}) => (
  <Providers
    initialCode={src}
    blocks={blocks}
    theme={theme}
    appTheme={appTheme}
    onChange={onChange}
    scope={{
      ...scope,
      props,
      layout
    }}
  >
    <Editor />
  </Providers>
)

export default EditorWithProviders
