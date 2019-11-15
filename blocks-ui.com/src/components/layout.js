/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'

export default ({ children }) => (
  <Styled.root>
    <title>Blocks UI</title>
    <main
      sx={{
        maxWidth: 600,
        m: 'auto'
      }}
    >
      <Link to="/">
        <img
          src="https://user-images.githubusercontent.com/1424573/61592179-e0fda080-ab8c-11e9-9109-166cc7c86b43.png"
          alt="blocks logo"
          width="80"
          style={{
            marginTop: 128,
            marginLeft: -5,
            marginBottom: 8
          }}
        />
      </Link>
      {children}
    </main>
  </Styled.root>
)
