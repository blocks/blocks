/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'
import { Global } from '@emotion/core'

export default ({ children }) => {
  return (
    <Styled.root>
      <Global
        styles={{
          '*': {
            boxSizing: 'border-box'
          },
          'html, body': {
            margin: 0,
            padding: 0
          }
        }}
      />
      <div>
        <main>{children}</main>
      </div>
    </Styled.root>
  )
}
