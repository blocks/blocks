/** @jsx jsx */
import { jsx } from 'theme-ui'

export default () => (
  <header
    sx={{
      display: 'flex',
      width: '100%',
      py: 2,
      px: 3,
      borderBottom: 'thin solid #e1e6eb'
    }}
  >
    <a href="/">
      <img
        alt="Blocks logo"
        src="https://user-images.githubusercontent.com/1424573/61592179-e0fda080-ab8c-11e9-9109-166cc7c86b43.png"
        sx={{
          height: 20,
          mt: -1,
          verticalAlign: 'middle'
        }}
      />
    </a>
  </header>
)
