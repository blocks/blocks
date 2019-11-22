import React, { useContext } from 'react'

const ElementContext = React.createContext({})

export const useElement = () => {
  const element = useContext(ElementContext)
  return element || {}
}

export default ElementContext
