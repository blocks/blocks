import React, { useState, useContext } from 'react'

const EDITOR_TAB_INDEX = 0
const COMPONENTS_TAB_INDEX = 1
const THEME_TAB_INDEX = 2

const TAB_INDEX_MAP = {
  [EDITOR_TAB_INDEX]: 'editor',
  [COMPONENTS_TAB_INDEX]: 'components',
  [THEME_TAB_INDEX]: 'theme'
}

const TAB_NAME_MAP = {
  editor: EDITOR_TAB_INDEX,
  components: COMPONENTS_TAB_INDEX,
  theme: THEME_TAB_INDEX
}

const EditorContext = React.createContext(null)

export const useEditor = () => {
  const value = useContext(EditorContext)

  return value
}

const EditorProvider = ({ children }) => {
  const [value, update] = useState({
    activeTabIndex: EDITOR_TAB_INDEX,
    activeTab: 'editor',
    mode: 'canvas'
  })

  return (
    <EditorContext.Provider
      value={{
        ...value,
        update,
        updateActiveTab: newTabIndex => {
          update({
            ...value,
            activeTab: TAB_INDEX_MAP[newTabIndex],
            activeTabIndex: newTabIndex
          })
        },
        updateActiveTabByName: newTabName => {
          update({
            ...value,
            activeTab: newTabName,
            activeTabIndex: TAB_NAME_MAP[newTabName]
          })
        }
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export default EditorProvider
