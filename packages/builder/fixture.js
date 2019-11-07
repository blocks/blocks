export default `
/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'
import { Blocks } from '@blocks/kit'

export default () => (
  <Blocks.Root>
    <header
      sx={{
        display: 'flex',
        alignItems: 'center',
        variant: 'styles.header',
        justifyContent: 'space-between',
        p: 4
      }}
    >
      <Link
        to="/"
        sx={{
          variant: 'styles.navlink',
          p: 2
        }}
      >
        Hello
      </Link>
      <nav>
        <Link
          to="/blog"
          sx={{
            variant: 'styles.navlink',
            p: 2
          }}
        >
          Blog
        </Link>
        <Link
          to="/about"
          sx={{
            variant: 'styles.navlink',
            p: 2
          }}
        >
          About
        </Link>
      </nav>
    </header>
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2
      }}
    >
      <img
        sx={{
          width: 150,
          borderRadius: 9999,
          marginRight: 20,
          p: 4
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
  </Blocks.Root>
)`
