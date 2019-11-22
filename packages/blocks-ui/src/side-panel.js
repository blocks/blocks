/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs'
import { Label, Input } from '@theme-ui/components'

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
          <div
            sx={{
              height: '100vh',
              overflow: 'scroll'
            }}
          >
            {elementData ? (
              <h3
                sx={{
                  textTransform: 'uppercase',
                  fontSize: 2,
                  fontWeight: 600,
                  m: 0,
                  px: 3,
                  py: 1,
                  borderBottom: 'thin solid #e1e6eb'
                }}
              >
                {elementData.name}
                <button onClick={handleRemoveElement}>Remove</button>
                <button onClick={handleInsertElement}>Insert</button>
                <button onClick={handleClone}>Clone</button>
                {elementData.parentId && (
                  <button onClick={handleParentSelect}>Parent</button>
                )}
              </h3>
            ) : (
              <ul>
                {blocks.map &&
                  blocks.map(block => (
                    <li key={block.id} onClick={() => setElementId(block.id)}>
                      {block.name}
                    </li>
                  ))}
              </ul>
            )}
            <div>
              {elementData && (
                <div sx={{ px: 3 }}>
                  {elementData.hasOwnProperty('text') && (
                    <React.Fragment>
                      <Label id="text">Text</Label>
                      <Input
                        sx={{
                          display: 'block',
                          width: '100%'
                        }}
                        onChange={handleTextUpdate}
                        value={elementData.text}
                        aria-labelledby="text"
                      />
                    </React.Fragment>
                  )}
                  <h3
                    sx={{
                      fontWeight: 'normal',
                      m: 0,
                      pb: 2,
                      pt: 4
                    }}
                  >
                    Props
                  </h3>
                  {elementData.props.hasOwnProperty('to') && (
                    <React.Fragment>
                      <Label id="to">To</Label>
                      <Input
                        sx={{
                          display: 'block',
                          width: '100%'
                        }}
                        onChange={handlePropChange('to')}
                        value={elementData.props.to || ''}
                        aria-labelledby="to"
                      />
                    </React.Fragment>
                  )}
                  <h3
                    sx={{
                      fontWeight: 'normal',
                      mt: 4,
                      mb: 0,
                      pt: 4,
                      borderTop: 'thin solid'
                    }}
                  >
                    Styles
                  </h3>
                  {elementData.props.sx && (
                    <React.Fragment>
                      <Label>Padding</Label>
                      <Input
                        sx={{
                          display: 'block',
                          width: '100%'
                        }}
                        onChange={handleChange('p')}
                        value={elementData.props.sx.p}
                      />
                      <button onClick={handleRemove('p')}>Remove</button>
                    </React.Fragment>
                  )}
                  <React.Fragment>
                    <Label>Background</Label>
                    <Input
                      sx={{
                        display: 'block',
                        width: '100%'
                      }}
                      onChange={handleChange('background')}
                      value={
                        elementData.props.sx &&
                        elementData.props.sx.backgroundColor
                      }
                    />
                    <button onClick={handleRemove('background')}>Remove</button>
                  </React.Fragment>
                  <React.Fragment>
                    <Label>Color</Label>
                    <Input
                      sx={{
                        display: 'block',
                        width: '100%'
                      }}
                      onChange={handleChange('color')}
                      value={elementData.props.sx.color}
                    />
                    <button onClick={handleRemove('color')}>Remove</button>
                  </React.Fragment>
                  <h3
                    sx={{
                      fontWeight: 'normal',
                      mt: 4,
                      mb: 0,
                      pt: 4,
                      borderTop: 'thin solid'
                    }}
                  >
                    Variant
                  </h3>
                  {elementData.props.sx && elementData.props.sx.variant && (
                    <React.Fragment>
                      <Label>
                        {elementData.props.sx.variant.replace('styles.', '')}
                      </Label>
                      <Input
                        sx={{
                          display: 'block',
                          width: '100%'
                        }}
                        onChange={handleChange('variant')}
                        value={elementData.props.sx.variant}
                      />
                    </React.Fragment>
                  )}
                  <pre>{JSON.stringify(elementData, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
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
