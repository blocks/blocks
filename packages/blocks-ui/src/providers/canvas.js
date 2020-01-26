import React, { useContext, useState } from 'react'

const CanvasContext = React.createContext({})

export const useCanvas = () => useContext(CanvasContext)

const CanvasProvider = ({ children }) => {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  return (
    <CanvasContext.Provider
      value={{
        canvasSize,
        setCanvasSize
      }}
    >
      {children}
    </CanvasContext.Provider>
  )
}

export default CanvasProvider
