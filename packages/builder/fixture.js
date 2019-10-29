export default `
/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'
import { Blocks } from '@blocks/kit'

const Header = () =>
  <header
    sx={{
    py: 4,
    variant: 'styles.headerz',
    width: '100%'
    }}
  >
    <div
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 3,
      }}
    >
      <Styled.a to='/' title='Home'>
        <img
          alt='UI Logo'
          src='https://contrast.now.sh/cff/40f?size=48&fontSize=2&baseline=2&fontWeight=900&radius=32&text=UI'
        />
        <span
          sx={{
            position: 'absolute',
            width: 1,
            height: 1,
            overflow: 'hidden',
            top: -9999,
          }}
        >
          Home
        </span>
      </Styled.a>
    </div>
    <nav
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Styled.a
        to='/work'
        sx={{
          variant: 'styles.navlink',
          p: 2,
        }}
      >
        Work
      </Styled.a>
      <Styled.a
        to='/blog'
        sx={{
          variant: 'styles.navlink',
          p: 2,
        }}
      >
        Blog
      </Styled.a>
      <Styled.a
        to='/about'
        sx={{
          variant: 'styles.navlink',
          p: 2,
        }}
      >
        About
      </Styled.a>
      <Styled.a
        to='/contact'
        sx={{
          variant: 'styles.navlink',
          p: 2,
        }}
      >
        Contact
      </Styled.a>
    </nav>
  </header>

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

const Footer = () => (
  <footer
    sx={{
      fontSize: 1,
      variant: 'styles.footer',
    }}
  >
    <div
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        maxWidth: 768,
        mx: 'auto',
        px: 2,
        py: 4,
      }}
    >
      <Styled.a
        to='/'
        sx={{
          variant: 'styles.navlink',
          p: 2
        }}
      >
        Home
      </Styled.a>
      <Styled.a
        to='/'
        sx={{
          variant: 'styles.navlink',
          p: 2
        }}
      >
        Blog
      </Styled.a>
      <Styled.a
        to='/'
        sx={{
          variant: 'styles.navlink',
          p: 2
        }}
      >
        About
      </Styled.a>
      <div sx={{ mx: 'auto' }} />
      <div sx={{ p: 2 }}>© 2019 Jane Doe</div>
    </div>
  </footer>
)

export default () => (
  <Blocks.Root>
    <Header />
    <AuthorBio />
    <Footer />
  </Blocks.Root>
)`
