/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Global } from '@emotion/core'
import { Container, Box } from '@theme-ui/components'
import { Link } from 'gatsby'
import { Twitter, GitHub, Mail } from 'react-feather'

import pkg from 'blocks-ui/package.json'

import Nav from '../nav'

import Subscribe from './subscribe'
import SEO from './seo'

const { version } = pkg

export default ({
  children,
  _frontmatter: { title, noNav, showNewsletter } = {}
}) => (
  <Styled.root>
    <SEO title={title} />
    <Global
      styles={{
        '*': {
          boxSizing: 'border-box'
        },
        body: {
          margin: 0
        },
        img: {
          maxWidth: '100%'
        }
      }}
    />
    <Box
      sx={{
        display: 'grid',
        minHeight: '100vh',
        gridTemplateAreas: [
          '"header" "nav" "main" "toc" "footer"',
          '"header header header" "nav main toc" "footer footer footer"'
        ],
        gridTemplateColumns: ['1fr', '240px 1fr 240px'],
        gridTemplateRows: [
          'min-content min-content 1fr min-content min-content',
          'min-content 1fr min-content'
        ]
      }}
    >
      <Box
        as="header"
        sx={{
          gridArea: 'header',
          borderBottom: '1px solid',
          borderColor: 'border',
          py: 2,
          px: 3,
          display: 'flex',
          aligntItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Link
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <img
            src="https://user-images.githubusercontent.com/1424573/61592179-e0fda080-ab8c-11e9-9109-166cc7c86b43.png"
            alt="blocks logo"
            width="32"
            sx={{
              verticalAlign: 'middle',
              ml: '-4px',
              mr: 2
            }}
          />
          Blocks
          <span
            sx={{
              fontSize: 0,
              mt: '2px',
              ml: 2
            }}
          >
            v{version}
          </span>
        </Link>
        <div
          sx={{
            display: 'flex',
            alignItems: 'center',
            verticalAlign: 'middle'
          }}
        >
          <a
            href="https://github.com/blocks/blocks"
            aria-label="Github"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mt: '5px',
              color: 'inherit'
            }}
          >
            <GitHub size={18} />
          </a>
          <a
            href="https://twitter.com/blocks_ui"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mt: '5px',
              color: 'inherit',
              ml: 3
            }}
          >
            <Twitter size={18} />
          </a>
          <a
            href="/newsletter"
            aria-label="Newsletter"
            sx={{
              mt: '5px',
              color: 'inherit',
              ml: 3,
              pl: '1px'
            }}
          >
            <Mail size={18} />
          </a>
        </div>
      </Box>
      <Box
        as="main"
        sx={{
          gridArea: 'main'
        }}
      >
        <Container sx={{ px: 3, py: [3, 4, 4] }}>
          {children}
          {showNewsletter ? <Subscribe /> : null}
        </Container>
      </Box>
      <Box
        as="aside"
        sx={{
          gridArea: 'nav',
          px: 3,
          pt: [3, 4],
          ul: {
            listStyle: 'none',
            p: 0,
            m: 0,
            mt: [0, '10px']
          },
          li: {
            fontSize: 2,
            fontWeight: 'bold',
            mb: 2,
            '& ul': {
              ml: 2,
              mt: 2,
              mb: 3
            },
            '& li': {
              fontWeight: 'normal',
              mb: 0
            }
          },
          a: {
            color: 'inherit',
            textDecoration: 'none',
            '&:hover, &:focus': {
              color: 'primary'
            }
          }
        }}
      >
        {noNav ? null : <Nav />}
      </Box>
      <Box
        as="aside"
        sx={{
          gridArea: 'toc'
        }}
      />
      <Box
        as="footer"
        sx={{
          gridArea: 'footer',
          py: [3, 5, 6],
          mt: [3, 4, 5],
          backgroundColor: 'text',
          color: 'background'
        }}
      >
        <Container
          sx={{
            px: 3,
            display: 'flex',
            alignItems: 'center',
            verticalAlign: 'middle'
          }}
        >
          <Link to="/">
            <img
              src="https://user-images.githubusercontent.com/1424573/61592179-e0fda080-ab8c-11e9-9109-166cc7c86b43.png"
              alt="blocks logo"
              width="32"
              sx={{
                verticalAlign: 'middle',
                mr: 4
              }}
            />
          </Link>
          <a
            href="https://github.com/blocks/blocks"
            aria-label="Github"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mt: '5px',
              ml: 'auto',
              color: 'inherit'
            }}
          >
            <GitHub size={18} />
          </a>
          <a
            href="https://twitter.com/blocks_ui"
            aria-label="Github"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mt: '5px',
              color: 'inherit',
              ml: 3
            }}
          >
            <Twitter size={18} />
          </a>
          <a
            href="/newsletter"
            aria-label="Newsletter"
            sx={{
              mt: '5px',
              color: 'inherit',
              ml: 3,
              pl: '1px'
            }}
          >
            <Mail size={18} />
          </a>
        </Container>
      </Box>
    </Box>
  </Styled.root>
)
