import React, { useContext } from 'react'
import * as DEFAULT_BLOCKS from '@blocks/react'

const BlocksContext = React.createContext({})

export const useBlocks = () => {
  const value = useContext(BlocksContext)
  return value
}

const BlocksProvider = ({ children, blocks = DEFAULT_BLOCKS }) => (
  <BlocksContext.Provider value={blocks}>{children}</BlocksContext.Provider>
)

export default BlocksProvider
