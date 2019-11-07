/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

export default ({ children }) => (
  <Styled.root>
    <title>Blocks UI</title>
    <main
      sx={{
        maxWidth: 600,
        m: 'auto'
      }}
    >
      {children}
    </main>
  </Styled.root>
)
