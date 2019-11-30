/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'

import EditorPanel from './editor-panel'
import ThemePanel from './theme-panel'
import BlocksListing from './blocks-listing'
import TreeView from './tree-view'

export default ({
  activeTab,
  setActiveTab,
  blocks,
  srcBlocks,
  theme,
  setTheme,
  elementData,
  handleChange,
  handlePropChange,
  handleRemove,
  handleRemoveElement,
  handleParentSelect,
  handleInsertElement,
  handleClone,
  handleTextUpdate,
  setElementId
}) => (
  <section
    id="side-panel"
    sx={{
      borderLeft: 'thin solid #e1e6eb',
      width: '40%',
      height: 'calc(100vh - 43px)',
      overflow: 'auto',
      pb: 3
    }}
  >
    <Tabs index={activeTab} onChange={index => setActiveTab(index)}>
      <TabList
        sx={{
          display: 'flex',
          width: '100%',
          position: 'sticky',
          top: 0
        }}
      >
        <Tab
          sx={{
            flex: 1,
            appearance: 'none',
            border: 0,
            py: 2,
            fontSize: 0,
            fontWeight: 500,
            borderBottom: activeTab === 0 ? 0 : 'thin solid #e1e6eb',
            backgroundColor: activeTab === 0 ? null : '#fafafa',
            '&:focus': {
              zIndex: 99,
              outline: 'none',
              fontWeight: 500,
              textDecoration: 'underline'
            }
          }}
        >
          Editor
        </Tab>
        <Tab
          sx={{
            flex: 1,
            appearance: 'none',
            border: 0,
            py: 2,
            fontSize: 0,
            fontWeight: 500,
            borderLeft: 'thin solid #e1e6eb',
            borderRight: 'thin solid #e1e6eb',
            borderBottom: activeTab === 1 ? 0 : 'thin solid #e1e6eb',
            backgroundColor: activeTab === 1 ? null : '#fafafa',
            '&:focus': {
              zIndex: 99,
              outline: 'none',
              fontWeight: 500,
              textDecoration: 'underline'
            }
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
            fontSize: 0,
            fontWeight: 500,
            borderBottom: activeTab === 2 ? 0 : 'thin solid #e1e6eb',
            backgroundColor: activeTab === 2 ? null : '#fafafa',
            '&:focus': {
              zIndex: 99,
              outline: 'none',
              fontWeight: 500,
              textDecoration: 'underline'
            }
          }}
        >
          Theme
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {elementData ? (
            <EditorPanel
              blocks={blocks}
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
          ) : (
            <div>
              <h3
                sx={{
                  fontSize: 1,
                  fontWeight: 500,
                  m: 0,
                  lineHeight: 1,
                  px: 3,
                  py: 2,
                  borderBottom: 'thin solid #e1e6eb'
                }}
              >
                Canvas
              </h3>
              <TreeView children={srcBlocks} onSelect={setElementId} />
            </div>
          )}
        </TabPanel>
        <TabPanel>
          {activeTab === 1 ? (
            <BlocksListing components={blocks} theme={theme} />
          ) : null}
        </TabPanel>
        <TabPanel>
          <ThemePanel theme={theme} setTheme={setTheme} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </section>
)
