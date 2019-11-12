/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Button, Box, Flex } from '@theme-ui/components'
const Link = Styled.a

export const HeaderA = () => (
  <header
    sx={{
      display: 'flex',
      alignItems: 'center',
      variant: 'styles.header'
    }}
  >
    <Link
      to="/"
      sx={{
        variant: 'styles.navLink',
        p: 2
      }}
    >
      Hello
    </Link>
    <div sx={{ mx: 'auto' }} />
    <Link
      to="/blog"
      sx={{
        variant: 'styles.navLink',
        p: 2
      }}
    >
      Blog
    </Link>
    <Link
      to="/about"
      sx={{
        variant: 'styles.navLink',
        p: 2
      }}
    >
      About
    </Link>
  </header>
)

export const HeaderAA = () => (
  <header
    sx={{
      display: 'flex',
      alignItems: 'center',
      variant: 'styles.header',
      justifyContent: 'space-between'
    }}
  >
    <Link
      to="/"
      sx={{
        variant: 'styles.navLink',
        p: 2
      }}
    >
      Hello
    </Link>
    <nav>
      <Link
        to="/blog"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Blog
      </Link>
      <Link
        to="/about"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        About
      </Link>
      <Button mx={2} variant="secondary">
        Login
      </Button>
      <Button>Sign Up</Button>
    </nav>
  </header>
)

export const HeaderAAA = () => (
  <header
    sx={{
      display: 'flex',
      alignItems: 'center',
      variant: 'styles.header',
      justifyContent: 'space-between'
    }}
  >
    <Link
      to="/"
      sx={{
        variant: 'styles.navLink',
        p: 2,
        width: '20%'
      }}
    >
      Hello
    </Link>
    <nav>
      <Link
        to="/resources"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Resources
      </Link>
      <Link
        to="/blog"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Blog
      </Link>
      <Link
        to="/about"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        About
      </Link>
      <Link
        to="/contact"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Contact
      </Link>
    </nav>
    <nav sx={{ width: '20%', textAlign: 'right' }}>
      <Button mx={2} variant="secondary">
        Login
      </Button>
      <Button>Sign Up</Button>
    </nav>
  </header>
)

export const HeaderAAAA = () => (
  <header
    sx={{
      display: 'flex',
      alignItems: 'center',
      variant: 'styles.header',
      justifyContent: 'space-between'
    }}
  >
    <nav>
      <Link
        to="/"
        sx={{
          variant: 'styles.navLink',
          p: 2,
          pr: 3,
          fontSize: 3,
          color: 'primary'
        }}
      >
        Hello
      </Link>
      <Link
        to="/blog"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Blog
      </Link>
      <Link
        to="/about"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        About
      </Link>
    </nav>
    <nav>
      <Button mx={2} variant="secondary">
        Login
      </Button>
      <Button>Sign Up</Button>
    </nav>
  </header>
)

export const HeaderB = () => (
  <header
    sx={{
      variant: 'styles.header'
    }}
  >
    <div
      sx={{
        maxWidth: 768,
        mx: 'auto',
        px: 3,
        display: 'flex',
        alignItems: 'baseline'
      }}
    >
      <Link
        to="/"
        sx={{
          variant: 'styles.navLink',
          fontSize: 5,
          py: 2
        }}
      >
        Hello
      </Link>
      <div sx={{ mx: 'auto' }} />
      <Link
        to="/blog"
        sx={{
          variant: 'styles.navLink',
          ml: 3,
          py: 2
        }}
      >
        Blog
      </Link>
      <Link
        to="/about"
        sx={{
          variant: 'styles.navLink',
          ml: 3,
          py: 2
        }}
      >
        About
      </Link>
    </div>
  </header>
)

export const HeaderBA = () => (
  <header
    sx={{
      variant: 'styles.header'
    }}
  >
    <div
      sx={{
        mx: 'auto',
        px: 3,
        display: 'flex',
        alignItems: 'baseline'
      }}
    >
      <Link
        to="/"
        sx={{
          variant: 'styles.navLink',
          fontSize: 5,
          textTransform: 'uppercase',
          py: 2,
          letterSpacing: 3
        }}
      >
        Hello
      </Link>
      <div sx={{ mx: 'auto' }} />
      <Link
        to="/blog"
        sx={{
          variant: 'styles.navLink',
          ml: 3,
          py: 2,
          textTransform: 'uppercase',
          borderBottomStyle: 'solid',
          borderBottomWidth: 4,
          letterSpacing: 3
        }}
      >
        Blog
      </Link>
      <Link
        to="/about"
        sx={{
          variant: 'styles.navLink',
          ml: 3,
          py: 2,
          textTransform: 'uppercase',
          borderBottomStyle: 'solid',
          borderBottomWidth: 4,
          letterSpacing: 3
        }}
      >
        About
      </Link>
    </div>
  </header>
)

export const HeaderBB = () => (
  <header
    sx={{
      variant: 'styles.header'
    }}
  >
    <div
      sx={{
        mx: 'auto',
        px: 3,
        display: 'flex',
        alignItems: 'baseline'
      }}
    >
      <Link
        to="/"
        sx={{
          variant: 'styles.navLink',
          fontSize: 5,
          textTransform: 'uppercase',
          py: 2,
          letterSpacing: 3
        }}
      >
        Hello
      </Link>
      <div sx={{ mx: 'auto' }} />
      <Link
        to="/blog"
        sx={{
          variant: 'styles.navLink',
          ml: 3,
          py: 2,
          textTransform: 'uppercase',
          letterSpacing: 3
        }}
      >
        Blog
      </Link>
      <Link
        to="/about"
        sx={{
          variant: 'styles.navLink',
          ml: 3,
          py: 2,
          textTransform: 'uppercase',
          letterSpacing: 3
        }}
      >
        About
      </Link>
    </div>
  </header>
)

export const HeaderBC = () => (
  <header
    sx={{
      variant: 'styles.header'
    }}
  >
    <div
      sx={{
        mx: 'auto',
        px: 3,
        display: 'flex',
        alignItems: 'baseline'
      }}
    >
      <Link
        to="/"
        sx={{
          variant: 'styles.navLink',
          textTransform: 'uppercase',
          py: 2,
          letterSpacing: 3
        }}
      >
        Hello
      </Link>
      <div sx={{ mx: 'auto' }} />
      <Link
        to="/blog"
        sx={{
          variant: 'styles.navLink',
          ml: 3,
          py: 2,
          textTransform: 'uppercase',
          letterSpacing: 3
        }}
      >
        Blog
      </Link>
      <Link
        to="/about"
        sx={{
          variant: 'styles.navLink',
          ml: 3,
          py: 2,
          textTransform: 'uppercase',
          letterSpacing: 3
        }}
      >
        About
      </Link>
    </div>
  </header>
)

export const HeaderC = () => (
  <header
    sx={{
      display: 'grid',
      gridGap: 3,
      maxWidth: 768,
      mx: 'auto',
      px: 3,
      py: 3,
      gridAutoFlow: 'row',
      gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(3, 1fr)'],
      variant: 'styles.header'
    }}
  >
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gridColumnStart: [1, 2],
        gridColumnEnd: [3, 3],
        order: [0, 1]
      }}
    >
      <Link to="/" title="Home">
        <img
          alt="UI Logo"
          src="https://contrast.now.sh/cff/40f?size=48&fontSize=2&baseline=2&fontWeight=900&radius=32&text=UI"
        />
        <span
          sx={{
            position: 'absolute',
            width: 1,
            height: 1,
            overflow: 'hidden',
            top: -9999
          }}
        >
          Home
        </span>
      </Link>
    </div>
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}
    >
      <Link
        to="/work"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Work
      </Link>
      <Link
        to="/blog"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Blog
      </Link>
    </div>
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        order: 2
      }}
    >
      <Link
        to="/about"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        About
      </Link>
      <Link
        to="/contact"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Contact
      </Link>
    </div>
  </header>
)

export const HeaderC2 = () => (
  <header
    sx={{
      display: 'grid',
      gridGap: 3,
      maxWidth: 768,
      mx: 'auto',
      px: 3,
      py: 3,
      gridAutoFlow: 'row',
      gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(3, 1fr)'],
      variant: 'styles.header'
    }}
  >
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gridColumnStart: [1, 2],
        gridColumnEnd: [3, 3],
        order: [0, 1]
      }}
    >
      <Link to="/" title="Home">
        <img
          alt="UI Logo"
          src="https://contrast.now.sh/cff/40f?size=48&fontSize=2&baseline=2&fontWeight=900&radius=32&text=UI"
        />
        <span
          sx={{
            position: 'absolute',
            width: 1,
            height: 1,
            overflow: 'hidden',
            top: -9999
          }}
        >
          Home
        </span>
      </Link>
    </div>
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
    >
      <Link
        to="/work"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Work
      </Link>
      <Link
        to="/blog"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Blog
      </Link>
    </div>
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        order: 2
      }}
    >
      <Link
        to="/about"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        About
      </Link>
      <Link
        to="/contact"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Contact
      </Link>
    </div>
  </header>
)

export const HeaderC3 = () => (
  <header
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: 768,
      mx: 'auto',
      px: 3,
      py: 3,
      variant: 'styles.header',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        order: [0, 1],
        width: ['100%', 'auto'],
        px: 2
      }}
    >
      <Link to="/" title="Home" sx={{ lineHeight: 1 }}>
        <img
          alt="UI Logo"
          src="https://contrast.now.sh/cff/40f?size=48&fontSize=2&baseline=2&fontWeight=900&radius=32&text=UI"
        />
        <span
          sx={{
            position: 'absolute',
            width: 1,
            height: 1,
            overflow: 'hidden',
            top: -9999
          }}
        >
          Home
        </span>
      </Link>
    </div>
    <div
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Link
        to="/work"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Work
      </Link>
      <Link
        to="/blog"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Blog
      </Link>
    </div>
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        order: 2
      }}
    >
      <Link
        to="/about"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        About
      </Link>
      <Link
        to="/contact"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Contact
      </Link>
    </div>
  </header>
)

export const HeaderD = () => (
  <header
    sx={{
      display: 'grid',
      gridGap: 3,
      gridTemplateColumns: 'repeat(3, 1fr)',
      px: 3,
      py: 4,
      alignItems: 'center',
      variant: 'styles.header'
    }}
  >
    <button
      title="Toggle Menu"
      sx={{
        appearance: 'none',
        width: 32,
        height: 32,
        m: 0,
        p: 1,
        color: 'inherit',
        bg: 'transparent',
        border: 0,
        ':focus': {
          outline: '2px solid'
        },
        ':hover': {
          color: 'primary'
        }
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentcolor"
        viewBox="0 0 24 24"
        sx={{
          display: 'block',
          margin: 0
        }}
      >
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
    </button>
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Link
        to="/"
        sx={{
          variant: 'styles.navLink',
          px: 3,
          py: 1,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          border: '4px solid',
          color: 'primary'
        }}
      >
        Home
      </Link>
    </div>
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
    >
      <Link
        to="/blog"
        sx={{
          variant: 'styles.navLink',
          ml: 3,
          py: 3
        }}
      >
        Blog
      </Link>
      <Link
        to="/about"
        sx={{
          variant: 'styles.navLink',
          ml: 3,
          py: 3
        }}
      >
        About
      </Link>
    </div>
  </header>
)

export const HeaderF = () => (
  <header
    sx={{
      py: 4,
      variant: 'styles.header'
    }}
  >
    <div
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 3
      }}
    >
      <Link to="/" title="Home">
        <img
          alt="UI Logo"
          src="https://contrast.now.sh/cff/40f?size=48&fontSize=2&baseline=2&fontWeight=900&radius=32&text=UI"
        />
        <span
          sx={{
            position: 'absolute',
            width: 1,
            height: 1,
            overflow: 'hidden',
            top: -9999
          }}
        >
          Home
        </span>
      </Link>
    </div>
    <div
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Link
        to="/work"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Work
      </Link>
      <Link
        to="/blog"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Blog
      </Link>
      <Link
        to="/about"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        About
      </Link>
      <Link
        to="/contact"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Contact
      </Link>
    </div>
  </header>
)

export const HeaderFA = () => (
  <header
    sx={{
      py: 4,
      variant: 'styles.header',
      textAlign: 'center'
    }}
  >
    <div
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 3
      }}
    >
      <Link to="/" title="Home">
        <img
          alt="UI Logo"
          src="https://contrast.now.sh/black/white?height=160&width=480&fontSize=1.4&baseline=2&fontWeight=900&text=Awesomeness"
        />
        <span
          sx={{
            position: 'absolute',
            width: 1,
            height: 1,
            overflow: 'hidden',
            top: -9999
          }}
        >
          Home
        </span>
      </Link>
    </div>
    <div
      sx={{
        display: 'inline-block',
        justifyContent: 'center',
        width: 'auto',
        mx: 'auto',
        mb: 4,
        borderTopStyle: 'solid',
        borderTopWidth: 'thin',
        borderTopColor: 'gray',
        borderBottomStyle: 'solid',
        borderBottomWidth: 'thin',
        borderBottomColor: 'gray',
        px: 4,
        py: 3
      }}
    >
      <Link
        to="/work"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Work
      </Link>
      <Link
        to="/blog"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Blog
      </Link>
      <Link
        to="/about"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        About
      </Link>
      <Link
        to="/contact"
        sx={{
          variant: 'styles.navLink',
          p: 2
        }}
      >
        Contact
      </Link>
    </div>
  </header>
)

export const HeaderFB = () => (
  <header
    sx={{
      py: 4,
      variant: 'styles.header',
      textAlign: 'center'
    }}
  >
    <div
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 3
      }}
    >
      <Link to="/" title="Home">
        <img
          alt="UI Logo"
          src="https://contrast.now.sh/black/white?height=160&width=480&fontSize=1.4&baseline=2&fontWeight=900&text=Awesomeness"
        />
        <span
          sx={{
            position: 'absolute',
            width: 1,
            height: 1,
            overflow: 'hidden',
            top: -9999
          }}
        >
          Home
        </span>
      </Link>
    </div>
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        mx: 'auto',
        mb: 4,
        borderTopStyle: 'solid',
        borderTopWidth: 'thin',
        borderTopColor: 'gray',
        borderBottomStyle: 'solid',
        borderBottomWidth: 'thin',
        borderBottomColor: 'gray',
        p: 3
      }}
    >
      <nav>
        <Link
          to="/work"
          sx={{
            variant: 'styles.navLink',
            p: 2
          }}
        >
          Work
        </Link>
        <Link
          to="/blog"
          sx={{
            variant: 'styles.navLink',
            p: 2
          }}
        >
          Blog
        </Link>
        <Link
          to="/about"
          sx={{
            variant: 'styles.navLink',
            p: 2
          }}
        >
          About
        </Link>
        <Link
          to="/contact"
          sx={{
            variant: 'styles.navLink',
            p: 2
          }}
        >
          Contact
        </Link>
      </nav>
      <nav>
        <Button variant="secondary" mr={2}>
          Sign In
        </Button>
        <Button>Sign Up</Button>
      </nav>
    </div>
  </header>
)

export const HeaderE = () => (
  <header
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      mx: 'auto',
      px: 3,
      py: 3,
      variant: 'styles.header'
    }}
  >
    <Link to="/" title="Home">
      <img
        alt="UI Logo"
        src="https://contrast.now.sh/cff/40f?size=48&fontSize=2&baseline=2&fontWeight=900&radius=32&text=UI"
      />
    </Link>
    <nav>
      <Link to="/" sx={{ variant: 'styles.navLink', p: 2 }}>
        Blog
      </Link>
      <Link to="/" sx={{ variant: 'styles.navLink', p: 2 }}>
        About
      </Link>
    </nav>
  </header>
)

export const HeaderE2 = () => (
  <header
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      maxWidth: 800,
      mx: 'auto',
      px: 3,
      py: 3,
      variant: 'styles.header'
    }}
  >
    <Link to="/" title="Home">
      <img
        alt="UI Logo"
        src="https://contrast.now.sh/cff/40f?size=48&fontSize=2&baseline=2&fontWeight=900&radius=32&text=UI"
      />
    </Link>
    <nav>
      <Link to="/" sx={{ variant: 'styles.navLink', p: 2 }}>
        Blog
      </Link>
      <Link to="/" sx={{ variant: 'styles.navLink', p: 2 }}>
        About
      </Link>
    </nav>
  </header>
)

export const HeaderG = () => (
  <header
    sx={{
      maxWidth: 800,
      mx: 'auto',
      px: 3,
      py: 4,
      variant: 'styles.header'
    }}
  >
    <Link to="/" title="Home">
      <img
        alt="UI Logo"
        src="https://contrast.now.sh/cff/40f?size=48&fontSize=2&baseline=2&fontWeight=900&radius=32&text=UI"
      />
    </Link>
    <nav
      sx={{
        mt: 4
      }}
    >
      <Link to="/" sx={{ variant: 'styles.navLink', p: 2 }}>
        Blog
      </Link>
      <Link to="/about" sx={{ variant: 'styles.navLink', p: 2 }}>
        About
      </Link>
      <Link to="/contact" sx={{ variant: 'styles.navLink', p: 2 }}>
        Contact
      </Link>
    </nav>
  </header>
)

export const HeaderH = () => (
  <header
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      mx: 5,
      px: 3,
      py: 4,
      variant: 'styles.header'
    }}
  >
    <Link to="/blog" sx={{ variant: 'styles.navLink', p: 2 }}>
      Blocks
    </Link>
    <Link to="/blog" sx={{ variant: 'styles.navLink', p: 2 }}>
      Blog
    </Link>
    <Link to="/about" sx={{ variant: 'styles.navLink', p: 2 }}>
      About
    </Link>
    <Link to="/contact" sx={{ variant: 'styles.navLink', p: 2 }}>
      Contact
    </Link>
  </header>
)

export const HeaderI = () => (
  <header
    sx={{
      color: 'background',
      backgroundColor: 'text',
      display: 'flex',
      justifyContent: 'space-between',
      px: 3,
      py: 4,
      variant: 'styles.header'
    }}
  >
    <Link to="/blog" sx={{ variant: 'styles.navLink', p: 2 }}>
      Blocks
    </Link>
    <Link to="/blog" sx={{ variant: 'styles.navLink', p: 2 }}>
      Blog
    </Link>
    <Link to="/about" sx={{ variant: 'styles.navLink', p: 2 }}>
      About
    </Link>
    <Link to="/contact" sx={{ variant: 'styles.navLink', p: 2 }}>
      Contact
    </Link>
  </header>
)

export const FooterA = () => (
  <footer
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      p: 2,
      variant: 'styles.footer'
    }}
  >
    <Link to="/" sx={{ variant: 'styles.navLink', p: 2 }}>
      Home
    </Link>
    <Link to="/" sx={{ variant: 'styles.navLink', p: 2 }}>
      Blog
    </Link>
    <Link to="/" sx={{ variant: 'styles.navLink', p: 2 }}>
      About
    </Link>
    <div sx={{ mx: 'auto' }} />
    <div sx={{ p: 2 }}>© 2019 Jane Doe</div>
  </footer>
)

export const FooterB = () => (
  <footer
    sx={{
      fontSize: 1,
      color: 'background',
      bg: 'text',
      variant: 'styles.footer'
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
        py: 4
      }}
    >
      <Link to="/" sx={{ variant: 'styles.navLink', p: 2 }}>
        Home
      </Link>
      <Link to="/" sx={{ variant: 'styles.navLink', p: 2 }}>
        Blog
      </Link>
      <Link to="/" sx={{ variant: 'styles.navLink', p: 2 }}>
        About
      </Link>
      <div sx={{ mx: 'auto' }} />
      <div sx={{ p: 2 }}>© 2019 Jane Doe</div>
    </div>
  </footer>
)

export const FooterC = () => (
  <footer
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
      variant: 'styles.footer'
    }}
  >
    <Link to="/" sx={{ variant: 'styles.navLink', p: 2 }}>
      Home
    </Link>
    <Link to="/" sx={{ variant: 'styles.navLink', p: 2 }}>
      Blog
    </Link>
    <Link to="/" sx={{ variant: 'styles.navLink', p: 2 }}>
      About
    </Link>
  </footer>
)

export const FooterD = () => (
  <footer
    sx={{
      fontSize: 1,
      variant: 'styles.footer'
    }}
  >
    <div
      sx={{
        display: 'grid',
        gridTemplateRows: 'repeat(4, 32px)',
        gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(4, 1fr)'],
        gridAutoFlow: 'column',
        px: 2,
        py: 4
      }}
    >
      <Link to="/" sx={{ variant: 'styles.navLink', p: 2 }}>
        Home
      </Link>
      <Link to="/work" sx={{ variant: 'styles.navLink', p: 2 }}>
        Work
      </Link>
      <Link to="/blog" sx={{ variant: 'styles.navLink', p: 2 }}>
        Blog
      </Link>
      <Link to="/about" sx={{ variant: 'styles.navLink', p: 2 }}>
        About
      </Link>
      <Link to="/products" sx={{ variant: 'styles.navLink', p: 2 }}>
        Products
      </Link>
      <Link to="/community" sx={{ variant: 'styles.navLink', p: 2 }}>
        Community
      </Link>
      <Link to="/support" sx={{ variant: 'styles.navLink', p: 2 }}>
        Support
      </Link>
      <Link to="/contact" sx={{ variant: 'styles.navLink', p: 2 }}>
        Contact
      </Link>
      <Link to="/support" sx={{ variant: 'styles.navLink', p: 2 }}>
        Support
      </Link>
      <Link to="/products" sx={{ variant: 'styles.navLink', p: 2 }}>
        Products
      </Link>
      <Link to="/contact" sx={{ variant: 'styles.navLink', p: 2 }}>
        Contact
      </Link>
      <Link to="/community" sx={{ variant: 'styles.navLink', p: 2 }}>
        Community
      </Link>
      <Link to="/products" sx={{ variant: 'styles.navLink', p: 2 }}>
        Products
      </Link>
      <Link to="/community" sx={{ variant: 'styles.navLink', p: 2 }}>
        Community
      </Link>
      <Link to="/support" sx={{ variant: 'styles.navLink', p: 2 }}>
        Support
      </Link>
      <Link to="/contact" sx={{ variant: 'styles.navLink', p: 2 }}>
        Contact
      </Link>
    </div>
    <div
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        color: 'gray',
        p: 3
      }}
    >
      <Link to="/privacy-policy" sx={{ color: 'inherit' }}>
        Privacy Policy
      </Link>
      <div sx={{ mx: 1 }} />
      <Link to="/terms-of-use" sx={{ color: 'inherit' }}>
        Terms of Use
      </Link>
      <div sx={{ mx: 1 }} />© 2019 Jane Doe
    </div>
  </footer>
)

export const FooterE = () => (
  <footer
    sx={{
      variant: 'styles.footer',
      maxWidth: 768,
      mx: 'auto',
      py: [4, 6]
    }}
  >
    <Link
      to="mailto:hello@example.org"
      sx={{
        fontWeight: 'bold',
        fontSize: 5,
        color: 'inherit'
      }}
    >
      hello@example.org
    </Link>
    <p sx={{ mt: -1, mb: 4, fontSize: 1 }}>© 2019 Jane Doe</p>
    <div sx={{ display: 'flex' }}>
      <Link to="/privacy-policy" sx={{ color: 'inherit' }}>
        Privacy Policy
      </Link>
      <div sx={{ ml: 3 }} />
      <Link to="/terms-of-use" sx={{ color: 'inherit' }}>
        Terms of Use
      </Link>
    </div>
  </footer>
)

export const ImageTitleA = () => (
  <div>
    <h1
      sx={{
        textAlign: 'center',
        backgroundImage: 'url(http://dc28c2r6oodom.cloudfront.net/p/h/006.jpg)',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center',
        backgroundSize: 'cover',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: 8,
        fontWeight: 800
      }}
    >
      Hello, world!
    </h1>
  </div>
)

export const ImageTitleB = () => (
  <div>
    <h1
      sx={{
        textAlign: 'center',
        backgroundImage: 'url(http://dc28c2r6oodom.cloudfront.net/p/h/058.jpg)',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center',
        backgroundSize: 'cover',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: 8,
        fontWeight: 800
      }}
    >
      Hello, world!
    </h1>
  </div>
)

export const ImageTitleC = () => (
  <div
    sx={{
      textAlign: 'center',
      backgroundColor: 'black',
      color: 'white',
      py: 4
    }}
  >
    <h1
      sx={{
        backgroundImage: 'url(http://dc28c2r6oodom.cloudfront.net/p/h/048.jpg)',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center',
        backgroundSize: 'contain',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: 8,
        fontWeight: 800,
        backgroundColor: 'text',
        color: 'background'
      }}
    >
      Hello, world!
    </h1>
  </div>
)

export const TagLineA = () => (
  <Box sx={{ py: [3, 4, 5], backgroundColor: 'primary', color: 'background' }}>
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Styled.h1 as="h3" sx={{ m: 0 }}>
        What is a block?
      </Styled.h1>
      <Styled.p sx={{ m: 0, maxWidth: 600 }}>
        A Block refers to a piece of content or a component. It's a section of
        your content while a document is a collection of blocks.
      </Styled.p>
      <Styled.p sx={{ mb: 0, maxWidth: 600 }}>
        Blocks can be simple like a paragraph of text or even a box with a
        tomato background color. Blocks can be complex like an embedded
        spreadsheet or a chart that fetches live data.
      </Styled.p>
    </Box>
  </Box>
)

export const TagLineB = () => (
  <Box sx={{ py: [3, 4, 5] }}>
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Styled.h1 as="h3" sx={{ mb: 0 }}>
        What is a block?
      </Styled.h1>
      <Styled.p sx={{ mt: 0, maxWidth: 600 }}>
        Blocks can be simple like a paragraph of text or even a box with a
        tomato background color. Blocks can be complex like an embedded
        spreadsheet or a chart that fetches live data.
      </Styled.p>
      <Button>Take it for a spin</Button>
    </Box>
  </Box>
)

export const TagLineC = () => (
  <Flex sx={{ alignItems: 'center', py: [3, 4, 5], maxWidth: 800, mx: 'auto' }}>
    <Box sx={{ pr: 3 }}>
      <Styled.h1 as="h3" sx={{ m: 0 }}>
        What is a block?
      </Styled.h1>
      <Styled.p sx={{ m: 0, maxWidth: 600 }}>
        Blocks can be simple like a paragraph of text or even a box with a
        tomato background color.
      </Styled.p>
    </Box>
    <Box sx={{ pl: 3 }}>
      <Button>Take it for a spin</Button>
    </Box>
  </Flex>
)

export const TagLineD = () => (
  <Flex sx={{ alignItems: 'center', py: [3, 4, 5], maxWidth: 800, mx: 'auto' }}>
    <Box sx={{ pr: 3 }}>
      <Button>Take it for a spin</Button>
    </Box>
    <Box sx={{ pl: 3 }}>
      <Styled.h1 as="h3" sx={{ m: 0 }}>
        What is a block?
      </Styled.h1>
      <Styled.p sx={{ m: 0, maxWidth: 600 }}>
        Blocks can be simple like a paragraph of text or even a box with a
        tomato background color.
      </Styled.p>
    </Box>
  </Flex>
)

export const TagLineE = () => (
  <Box sx={{ textAlign: 'center', py: [3, 4, 5], maxWidth: 800, mx: 'auto' }}>
    <Styled.h1 as="h3" sx={{ m: 0 }}>
      What is a block?
    </Styled.h1>
    <Styled.p sx={{ mt: 0, mx: 'auto', maxWidth: 600 }}>
      Blocks can be simple like a paragraph of text or even a box with a tomato
      background color.
    </Styled.p>
    <Button>Take it for a spin</Button>
  </Box>
)

export const TagLineEA = () => (
  <Box sx={{ backgroundColor: '#2B2D2D' }}>
    <Box sx={{ textAlign: 'center', py: [4, 5, 6], maxWidth: 800, mx: 'auto' }}>
      <Styled.h1 as="h3" sx={{ mt: 0, color: 'white' }}>
        Let's do something great together
      </Styled.h1>
      <Button
        sx={{
          backgroundColor: 'transparent',
          border: '2px solid',
          color: 'white',
          fontSize: 3,
          px: 5
        }}
      >
        Get started
      </Button>
    </Box>
  </Box>
)

export const TagLineF = () => (
  <Box
    sx={{
      background: 'linear-gradient(330deg, #471091 34%, #2D2BAB 79%)',
      backgroundColor: '#471091',
      color: 'white'
    }}
  >
    <Box sx={{ textAlign: 'center', py: [3, 4, 5], maxWidth: 800, mx: 'auto' }}>
      <Styled.h1 as="h3" sx={{ m: 0 }}>
        What is a block?
      </Styled.h1>
      <Styled.p sx={{ mt: 0, mb: 4, mx: 'auto', maxWidth: 600 }}>
        Blocks can be simple like a paragraph of text or even a box with a
        tomato background color.
      </Styled.p>
      <Button
        sx={{
          color: '#471091',
          backgroundColor: '#acaedf',
          px: 5,
          py: 3,
          fontSize: 3,
          fontWeight: 600
        }}
      >
        Take it for a spin
      </Button>
    </Box>
  </Box>
)

export const TagLineFA = () => (
  <Box
    sx={{
      background: 'linear-gradient(330deg, #471091 34%, #2D2BAB 79%)',
      backgroundColor: '#471091',
      color: 'white'
    }}
  >
    <Box sx={{ py: [3, 4, 5], maxWidth: 800, mx: 'auto' }}>
      <Styled.h1 as="h3" sx={{ m: 0 }}>
        What is a block?
      </Styled.h1>
      <Styled.p sx={{ mt: 0, mb: 4, maxWidth: 600 }}>
        Blocks can be simple like a paragraph of text or even a box with a
        tomato background color.
      </Styled.p>
      <Button
        sx={{
          color: '#471091',
          backgroundColor: '#acaedf',
          px: 5,
          py: 3,
          fontSize: 3,
          fontWeight: 600
        }}
      >
        Take it for a spin
      </Button>
    </Box>
  </Box>
)

export const HeroA = () => (
  <Flex
    sx={{ alignItems: 'center', py: [3, 4, 5], maxWidth: 1200, mx: 'auto' }}
  >
    <Box sx={{ pr: 3, width: '50%' }}>
      <Styled.h1 sx={{ fontSize: [5, 6, 8], m: 0 }}>Awesomeness</Styled.h1>
      <Styled.p sx={{ fontSize: [2, 3, 4], m: 0, maxWidth: 500 }}>
        This is a hero, with some convincing copy and a call to action.
      </Styled.p>
      <Box sx={{ pt: 3 }}>
        <Button>Try it</Button>
        <Button sx={{ ml: 2 }} variant="secondary">
          Doc
        </Button>
      </Box>
    </Box>
    <Box sx={{ width: '50%', pl: [null, 3, 4] }}>
      <img
        alt="Hologram graphic"
        src="https://assets.blocks-ui.com/hologram.svg"
        sx={{
          maxWidth: '100%'
        }}
      />
    </Box>
  </Flex>
)

export const HeroB = () => (
  <Flex
    sx={{ alignItems: 'center', py: [3, 4, 5], maxWidth: 1200, mx: 'auto' }}
  >
    <Box sx={{ pr: 3, width: '50%' }}>
      <Styled.h6 sx={{ mb: 1, textTransform: 'uppercase' }}>Kicker</Styled.h6>
      <Styled.h1 sx={{ fontSize: [5, 6, 8], m: 0 }}>Awesomeness</Styled.h1>
      <Styled.p sx={{ fontSize: [2, 3, 4], m: 0, maxWidth: 500 }}>
        This is a hero, with some convincing copy and a call to action.
      </Styled.p>
      <Box sx={{ pt: 3 }}>
        <Button>Try it</Button>
        <Button sx={{ ml: 2 }} variant="secondary">
          Doc
        </Button>
      </Box>
    </Box>
    <Box sx={{ width: '50%', pl: [null, 3, 4] }}>
      <img
        alt="Hologram graphic"
        src="https://assets.blocks-ui.com/hologram.svg"
        sx={{
          maxWidth: '100%'
        }}
      />
    </Box>
  </Flex>
)

export const HeroBG = () => (
  <Box
    sx={{
      py: 4,
      background: 'linear-gradient(330deg, #471091 34%, #2D2BAB 79%)',
      backgroundColor: '#471091',
      color: 'white'
    }}
  >
    <Flex
      sx={{ alignItems: 'center', py: [3, 4, 5], maxWidth: 1200, mx: 'auto' }}
    >
      <Box sx={{ pr: 3, width: '50%' }}>
        <Styled.h6 sx={{ mb: 1, textTransform: 'uppercase', color: '#acaedf' }}>
          Kicker
        </Styled.h6>
        <Styled.h1 sx={{ fontSize: [5, 6, 8], m: 0 }}>Awesomeness</Styled.h1>
        <Styled.p sx={{ fontSize: [2, 3, 4], m: 0, maxWidth: 500 }}>
          This is a hero, with some convincing copy and a call to action.
        </Styled.p>
        <Box sx={{ pt: 4 }}>
          <Button
            sx={{
              color: '#471091',
              backgroundColor: '#acaedf',
              px: 5,
              py: 3,
              fontSize: 3,
              fontWeight: 600
            }}
          >
            Take it for a spin
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: '50%', pl: [null, 3, 4] }}>
        <img
          alt="Hologram graphic"
          src="https://assets.blocks-ui.com/hologram.svg"
          sx={{
            maxWidth: '100%'
          }}
        />
      </Box>
    </Flex>
  </Box>
)

export const HeroC = () => (
  <Flex
    sx={{ alignItems: 'center', py: [3, 4, 5], maxWidth: 1200, mx: 'auto' }}
  >
    <Box sx={{ width: '50%', pr: [null, 3, 4] }}>
      <img
        alt="Hologram graphic"
        src="https://assets.blocks-ui.com/hologram.svg"
        sx={{
          maxWidth: '100%'
        }}
      />
    </Box>
    <Box sx={{ pl: 3, width: '50%' }}>
      <Styled.h6 sx={{ mb: 1, textTransform: 'uppercase' }}>Kicker</Styled.h6>
      <Styled.h1 sx={{ fontSize: [5, 6, 8], m: 0 }}>Awesomeness</Styled.h1>
      <Styled.p sx={{ fontSize: [2, 3, 4], m: 0, maxWidth: 500 }}>
        This is a hero, with some convincing copy and a call to action.
      </Styled.p>
      <Box sx={{ pt: 3 }}>
        <Button>Try it</Button>
        <Button sx={{ ml: 2 }} variant="secondary">
          Doc
        </Button>
      </Box>
    </Box>
  </Flex>
)

export const HeroD = () => (
  <Box
    sx={{
      textAlign: 'center',
      px: 3,
      py: [3, 4, 5],
      maxWidth: 1200,
      mx: 'auto',
      width: '50%'
    }}
  >
    <Styled.h1 sx={{ fontSize: [5, 6, 8], m: 0 }}>Awesomeness</Styled.h1>
    <Styled.p sx={{ fontSize: [2, 3, 4], my: 0, mx: 'auto', maxWidth: 500 }}>
      This is a hero, with some convincing copy and a call to action.
    </Styled.p>
    <Box sx={{ pt: 4 }}>
      <Button sx={{ mr: 2 }}>Try it</Button>
      <span>or</span>
      <Button sx={{ ml: 2 }} variant="secondary">
        Doc
      </Button>
    </Box>
  </Box>
)

export const HeroE = () => (
  <Flex
    sx={{
      px: 3,
      py: [3, 4, 5],
      maxWidth: 1200,
      mx: 'auto',
      alignItems: 'center'
    }}
  >
    <Box
      sx={{
        width: '60%'
      }}
    >
      <Styled.h1 sx={{ fontSize: [5, 6, 8], m: 0 }}>Awesomeness</Styled.h1>
      <Styled.p sx={{ fontSize: [2, 3, 4], my: 0, maxWidth: 500 }}>
        This is a hero, with some convincing copy and a call to action.
      </Styled.p>
    </Box>
    <Box
      sx={{
        width: '40%'
      }}
    >
      <img
        src="https://assets.blocks-ui.com/lachlan-gowen-building.jpg"
        sx={{
          width: '100%'
        }}
      />
    </Box>
  </Flex>
)

export const HeroEA = () => (
  <Flex
    sx={{
      px: 3,
      py: [3, 4, 5],
      maxWidth: 1200,
      mx: 'auto',
      alignItems: 'center'
    }}
  >
    <Box
      sx={{
        width: '60%',
        backgroundColor: 'background',
        mr: -5,
        px: 5,
        py: 5,
        zIndex: 999
      }}
    >
      <Styled.h1 sx={{ fontSize: [5, 6, 8], m: 0 }}>Awesomeness</Styled.h1>
      <Styled.p sx={{ fontSize: [2, 3, 4], mt: 0, maxWidth: 500 }}>
        This is a hero, with some convincing copy and a call to action.
      </Styled.p>
      <Styled.p sx={{ fontSize: [2, 3, 4], maxWidth: 500 }}>
        This is a hero, with some convincing copy and a call to action.
      </Styled.p>
    </Box>
    <Box
      sx={{
        width: '40%'
      }}
    >
      <img
        src="https://assets.blocks-ui.com/minh-pham-interior.jpg"
        sx={{
          width: '100%'
        }}
      />
    </Box>
  </Flex>
)

export const HeroEB = () => (
  <Flex
    sx={{
      px: 3,
      py: [3, 4, 5],
      maxWidth: 1200,
      mx: 'auto',
      alignItems: 'center'
    }}
  >
    <Box
      sx={{
        width: '40%'
      }}
    >
      <img
        src="https://assets.blocks-ui.com/minh-pham-interior.jpg"
        sx={{
          width: '100%'
        }}
      />
    </Box>
    <Box
      sx={{
        width: '60%',
        backgroundColor: 'background',
        ml: -5,
        px: 5,
        py: 5,
        zIndex: 999
      }}
    >
      <Styled.h1 sx={{ fontSize: [5, 6, 8], m: 0 }}>Awesomeness</Styled.h1>
      <Styled.p sx={{ fontSize: [2, 3, 4], mt: 0, maxWidth: 500 }}>
        This is a hero, with some convincing copy and a call to action.
      </Styled.p>
      <Styled.p sx={{ fontSize: [2, 3, 4], maxWidth: 500 }}>
        This is a hero, with some convincing copy and a call to action.
      </Styled.p>
    </Box>
  </Flex>
)

export const HeroF = () => (
  <Box
    sx={{
      textAlign: 'center',
      px: 3,
      py: [3, 4, 5],
      maxWidth: 1200,
      mx: 'auto'
    }}
  >
    <Styled.h1 sx={{ fontSize: [5, 6, 8], m: 0 }}>Awesomeness</Styled.h1>
    <Styled.p sx={{ fontSize: [2, 3, 4], my: 0, mx: 'auto', maxWidth: 500 }}>
      This is a hero, with some convincing copy and a call to action.
    </Styled.p>
    <Box sx={{ pt: 4, pb: 5 }}>
      <Button sx={{ backgroundColor: '#173383' }}>Give it a go</Button>
    </Box>
    <img
      src="https://assets.blocks-ui.com/house-interior.jpg"
      sx={{
        width: '100%'
      }}
    />
  </Box>
)

export const HeroFA = () => (
  <Box>
    <Box
      sx={{
        p: [3, 4, 5],
        pb: [7, 7, 7],
        backgroundColor: 'text',
        color: 'background'
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          px: 3,
          py: [3, 4, 5],
          maxWidth: 1200,
          mx: 'auto'
        }}
      >
        <Styled.h1 sx={{ fontSize: [5, 6, 8], m: 0 }}>Awesomeness</Styled.h1>
        <Styled.p
          sx={{ fontSize: [2, 3, 4], my: 0, mx: 'auto', maxWidth: 500 }}
        >
          This is a hero, with some convincing copy and a call to action.
        </Styled.p>
        <Box sx={{ pt: 4, pb: 5 }}>
          <Button sx={{ backgroundColor: '#173383' }}>Give it a go</Button>
        </Box>
      </Box>
    </Box>
    <Box
      sx={{
        textAlign: 'center',
        pb: [3, 4, 5]
      }}
    >
      <img
        src="https://assets.blocks-ui.com/house-interior.jpg"
        sx={{
          mt: -7,
          width: '100%',
          maxWidth: 1200
        }}
      />
    </Box>
  </Box>
)

export const HeroG = () => (
  <Flex
    sx={{
      px: 3,
      py: [3, 4, 5],
      maxWidth: 1200,
      mx: 'auto',
      alignItems: 'center'
    }}
  >
    <Box
      sx={{
        width: '60%'
      }}
    >
      <Styled.h1 sx={{ fontSize: [5, 6, 8], m: 0, color: '#0F5A3D' }}>
        Awesomeness
      </Styled.h1>
      <Styled.p sx={{ fontSize: [2, 3, 4], mt: 0, maxWidth: 500 }}>
        This is a hero, with some convincing copy and a call to action.
      </Styled.p>
      <Button sx={{ backgroundColor: '#0F5A3D' }}>Give it a try</Button>
    </Box>
    <Box
      sx={{
        width: '40%'
      }}
    >
      <img
        src="https://assets.blocks-ui.com/jude-beck-plant.jpg"
        sx={{
          width: '100%'
        }}
      />
    </Box>
  </Flex>
)

export const DescriptionA = () => (
  <Flex sx={{ py: [3, 4, 5], maxWidth: 1200, mx: 'auto' }}>
    <Box sx={{ pr: 3, width: '50%' }}>
      <Styled.h1
        as="blockquote"
        sx={{
          mx: 0,
          mt: 0,
          mb: 2,
          ':before': {
            content: '"“"',
            position: 'absolute',
            transform: 'translateX(-30px)'
          },
          ':after': {
            content: '"”"'
          }
        }}
      >
        This is an amazing quote about something very interesting.
      </Styled.h1>
      <footer sx={{ fontSize: 2 }}>&mdash; Some person</footer>
    </Box>
    <Box sx={{ pl: 3 }}>
      <Styled.p sx={{ mt: 0, maxWidth: 600 }}>
        Blocks can be simple like a paragraph of text or even a box with a
        tomato background color. Blocks can be simple like a paragraph of text
        or even a box with a tomato background color.
      </Styled.p>
      <Styled.p sx={{ maxWidth: 600 }}>Blocks can be simple.</Styled.p>
      <Styled.p sx={{ maxWidth: 600 }}>
        Blocks can be simple like a paragraph of text or even a box with a
        tomato background color.
      </Styled.p>
      <Styled.p sx={{ maxWidth: 600 }}>
        Blocks can be simple like a paragraph of text or even a box with a
        tomato background color.
      </Styled.p>
      <Box sx={{ mt: 4 }}>
        <Button>Do something</Button>
      </Box>
    </Box>
  </Flex>
)

export const DescriptionAA = () => (
  <Flex
    sx={{ alignItems: 'center', py: [3, 4, 5], maxWidth: 1200, mx: 'auto' }}
  >
    <Box sx={{ pr: 3, width: '50%' }}>
      <Styled.h1
        as="blockquote"
        sx={{
          mx: 0,
          mt: 0,
          mb: 2,
          ':before': {
            content: '"“"',
            position: 'absolute',
            transform: 'translateX(-30px)'
          },
          ':after': {
            content: '"”"'
          }
        }}
      >
        This is an amazing quote about something very interesting.
      </Styled.h1>
      <footer sx={{ fontSize: 2 }}>&mdash; Some person</footer>
    </Box>
    <Box sx={{ pl: 3 }}>
      <Styled.p sx={{ mt: 0, maxWidth: 600 }}>
        Blocks can be simple like a paragraph of text or even a box with a
        tomato background color. Blocks can be simple like a paragraph of text
        or even a box with a tomato background color.
      </Styled.p>
      <Styled.p sx={{ maxWidth: 600 }}>Blocks can be simple.</Styled.p>
      <Styled.p sx={{ maxWidth: 600 }}>
        Blocks can be simple like a paragraph of text or even a box with a
        tomato background color.
      </Styled.p>
      <Styled.p sx={{ maxWidth: 600 }}>
        Blocks can be simple like a paragraph of text or even a box with a
        tomato background color.
      </Styled.p>
      <Box sx={{ mt: 4 }}>
        <Button>Do something</Button>
      </Box>
    </Box>
  </Flex>
)

export const DescriptionAAA = () => (
  <Flex
    sx={{ alignItems: 'center', py: [3, 4, 5], maxWidth: 1200, mx: 'auto' }}
  >
    <Box sx={{ pl: 3 }}>
      <Styled.p sx={{ mt: 0, maxWidth: 600 }}>
        Blocks can be simple like a paragraph of text or even a box with a
        tomato background color. Blocks can be simple like a paragraph of text
        or even a box with a tomato background color.
      </Styled.p>
      <Styled.p sx={{ maxWidth: 600 }}>Blocks can be simple.</Styled.p>
      <Styled.p sx={{ maxWidth: 600 }}>
        Blocks can be simple like a paragraph of text or even a box with a
        tomato background color.
      </Styled.p>
      <Styled.p sx={{ maxWidth: 600 }}>
        Blocks can be simple like a paragraph of text or even a box with a
        tomato background color.
      </Styled.p>
      <Box sx={{ mt: 4 }}>
        <Button>Do something</Button>
      </Box>
    </Box>
    <Box sx={{ pl: [3, 4, 5], width: '50%' }}>
      <Styled.h1
        as="blockquote"
        sx={{
          mx: 0,
          mt: 0,
          mb: 2,
          ':before': {
            content: '"“"',
            position: 'absolute',
            transform: 'translateX(-30px)'
          },
          ':after': {
            content: '"”"'
          }
        }}
      >
        This is an amazing quote about something very interesting.
      </Styled.h1>
      <footer sx={{ fontSize: 2 }}>&mdash; Some person</footer>
    </Box>
  </Flex>
)

export const BlockQuote = () => (
  <Box
    sx={{ px: 3, py: [3, 4, 5], textAlign: 'center', m: 'auto', maxWidth: 700 }}
  >
    <Styled.h1
      as="blockquote"
      sx={{
        mx: 0,
        mt: 0,
        mb: 2,
        ':before': {
          content: '"“"',
          position: 'absolute',
          transform: 'translateX(-30px)'
        },
        ':after': {
          content: '"”"'
        }
      }}
    >
      This is an amazing quote about something very interesting.
    </Styled.h1>
    <footer sx={{ fontSize: 2 }}>&mdash; Some person</footer>
  </Box>
)

export const ImageBlock = () => (
  <figure
    sx={{
      left: 'calc(50% - 50vw)',
      maxWidth: '100vw',
      position: 'relative',
      width: '100vw',
      ml: 0,
      mr: 0
    }}
  >
    <img
      alt="Pine branch"
      src="https://assets.blocks-ui.com/tim-foster-pine-branch.jpg"
      sx={{
        height: 'auto',
        verticalAlign: 'middle',
        display: 'block',
        width: '100%'
      }}
    />
  </figure>
)

export const H1 = () => (
  <div>
    <Styled.h1>Heading One</Styled.h1>
  </div>
)
export const H2 = () => (
  <div>
    <Styled.h2>Heading Two</Styled.h2>
  </div>
)
export const H3 = () => (
  <div>
    <Styled.h3>Heading Three</Styled.h3>
  </div>
)
export const H4 = () => (
  <div>
    <Styled.h4>Heading Four</Styled.h4>
  </div>
)
export const P = () => (
  <div>
    <Styled.p sx={{ maxWidth: 320 }}>Here's an awesome paragraph</Styled.p>
  </div>
)
