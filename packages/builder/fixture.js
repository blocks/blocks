export default `
/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'
import { Blocks } from '@blocks/kit'

const AuthorBio = () =>
  <div
    sx={{
      display: 'flex',
      alignItems: 'center'
    }}
  >
    <img
      sx={{
        width: 150,
        borderRadius: 9999,
        marginRight: 20
      }}
      src="https://avatars3.githubusercontent.com/u/1424573?s=460&v=4"
    />
    <div>
      <h1
        sx={{
          color: 'tomato',
          margin: 0
        }}
      >
        Hello, world!
      </h1>
      <p
        sx={{
          margin: 0
        }}
      >
        Here is a bio
      </p>
    </div>
  </div>

export default () => (
  <Blocks.Root>
    <AuthorBio />
  </Blocks.Root>
)`
