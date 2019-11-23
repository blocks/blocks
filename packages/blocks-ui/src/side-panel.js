/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'

import EditorPanel from './editor-panel'
import ThemePanel from './theme-panel'
import BlocksListing from './blocks-listing'

export default ({
  activeTab,
  setActiveTab,
  blocks,
  theme,
  themeName,
  elementData,
  handleChange,
  handlePropChange,
  handleRemove,
  handleRemoveElement,
  handleParentSelect,
  handleInsertElement,
  handleClone,
  handleTextUpdate,
  setThemeName,
  setElementId
}) => (
  <section
    id="side-panel"
    sx={{
      borderLeft: 'thin solid #e1e6eb',
      width: '40%',
      height: '100vh',
      overflow: 'scroll'
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
            borderBottom: activeTab === 0 ? 0 : 'thin solid #e1e6eb',
            backgroundColor: activeTab === 0 ? null : '#fafafa'
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
            borderLeft: 'thin solid #e1e6eb',
            borderRight: 'thin solid #e1e6eb',
            borderBottom: activeTab === 1 ? 0 : 'thin solid #e1e6eb',
            backgroundColor: activeTab === 1 ? null : '#fafafa'
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
            borderBottom: activeTab === 2 ? 0 : 'thin solid #e1e6eb',
            backgroundColor: activeTab === 2 ? null : '#fafafa'
          }}
        >
          Theme
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {elementData ? (
            <EditorPanel
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
          ) : null}
        </TabPanel>
        <TabPanel>
          {activeTab === 1 ? (
            <BlocksListing components={blocks} theme={theme} />
          ) : null}
        </TabPanel>
        <TabPanel>
          <ThemePanel themeName={themeName} setThemeName={setThemeName} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </section>
)
