import React, { useContext } from 'react'

const ElementContext = React.createContext({})

export const useElement = () => {
  const element = useContext(ElementContext)
  return element || {}
}

export const ElementProvider = ElementContext.Provider

export default ElementContext
