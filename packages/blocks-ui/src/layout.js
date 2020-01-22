/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'
import { Global } from '@emotion/core'

import Header from './header'

export default ({ children }) => {
  return (
    <Styled.root>
      <Header />
      <Global
        styles={{
          '*': {
            boxSizing: 'border-box'
          },
          body: {
            margin: 0
          }
        }}
      />
      <div
        sx={{
          display: 'flex',
          height: 'calc(100vh - 43px)'
        }}
      >
        {children}
      </div>
    </Styled.root>
  )
}
