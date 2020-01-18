/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'

import { useCode } from '../providers/code'
import { useEditor } from '../providers/editor'

import EditorPanel from './editor'
import ThemePanel from './theme'
import BlocksListing from './blocks-listing'

export default () => {
  const { activeTab, activeTabIndex, updateActiveTab } = useEditor()
  const { currentElementData: elementData } = useCode()

  return (
    <section
      id="side-panel"
      sx={{
        borderLeft: '1px solid',
        borderColor: 'border',
        overflow: 'auto',
        pb: 3
      }}
    >
      <Tabs index={activeTabIndex} onChange={index => updateActiveTab(index)}>
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
              ...baseTabStyles,
              borderColor: activeTab === 'editor' ? 'transparent' : 'border',
              backgroundColor: activeTab === 'editor' ? null : '#fafafa'
            }}
          >
            Editor
          </Tab>
          <Tab
            sx={{
              ...baseTabStyles,
              borderLeft: '1px solid',
              borderRight: '1px solid',
              borderColor:
                activeTab === 'components' ? 'transparent' : 'border',
              backgroundColor: activeTab === 'components' ? null : '#fafafa'
            }}
          >
            Components
          </Tab>
          <Tab
            sx={{
              ...baseTabStyles,
              borderColor: activeTab === 'theme' ? 'transparent' : 'border',
              backgroundColor: activeTab === 'theme' ? null : '#fafafa'
            }}
          >
            Theme
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {elementData ? (
              <EditorPanel />
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
                    borderBottom: '1px solid',
                    borderColor: 'border'
                  }}
                >
                  Canvas
                </h3>
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {activeTab === 'components' ? <BlocksListing /> : null}
          </TabPanel>
          <TabPanel>
            <ThemePanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  )
}

// Base sytles for tabs
const baseTabStyles = {
  flex: 1,
  appearance: 'none',
  border: 0,
  py: 2,
  fontSize: 0,
  fontWeight: 500,
  borderBottomStyle: 'solid',
  borderBottomWidth: 'thin',
  '&:focus': {
    zIndex: 99,
    outline: 'none',
    fontWeight: 500,
    textDecoration: 'underline'
  }
}
