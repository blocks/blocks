import React, { useState, useContext } from 'react'

const EDITOR_TAB_INDEX = 0
const COMPONENTS_TAB_INDEX = 1
const THEME_TAB_INDEX = 2

const CANVAS_MODE = 'canvas'

const TAB_MAP = {
  [EDITOR_TAB_INDEX]: 'editor',
  [COMPONENTS_TAB_INDEX]: 'components',
  [THEME_TAB_INDEX]: 'theme'
}

const getActiveTabName = index => TAB_MAP[index]

const EditorContext = React.createContext(null)

export const useEditor = () => {
  const value = useContext(EditorContext)

  return value
}

export const EditorProvider = ({ children }) => {
  const [value, update] = useState({
    //activeTab: EDITOR_TAB_INDEX,
    mode: 'canvas'
  })

  // TODO: Make tabs use context
  //const activeTabName = getActiveTabName(value.activeTab)

  return (
    <EditorContext.Provider value={{ ...value, update }}>
      {children}
    </EditorContext.Provider>
  )
}
