/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Global } from '@emotion/core'
import { Container, Box } from '@theme-ui/components'
import { Link } from 'gatsby'
import { Twitter, GitHub } from 'react-feather'

import Nav from '../nav.mdx'

export default ({ children, title }) => (
  <Styled.root>
    <title>{title ? title + ' / ' : null} Blocks UI</title>
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
        sx={{
          gridArea: 'header',
          borderBottom: 'thin solid #e1e6eb',
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
            sx={{
              mt: '5px',
              color: 'inherit'
            }}
          >
            <GitHub size={18} />
          </a>
          <a
            href="https://github.com/blocks/blocks"
            sx={{
              mt: '5px',
              color: 'inherit',
              ml: 3
            }}
          >
            <Twitter size={18} />
          </a>
        </div>
      </Box>
      <Box
        sx={{
          gridArea: 'main'
        }}
      >
        <Container sx={{ px: 3, py: [3, 4, 4] }}>{children}</Container>
      </Box>
      <Box
        sx={{
          gridArea: 'nav',
          px: 3,
          py: [3, 4, 4],
          mt: '10px',
          ul: {
            listStyle: 'none',
            p: 0
          },
          li: {
            mb: 1,
            fontSize: 1,
            ul: {
              li: {
                mb: 0
              },
              pl: 2,
              a: {
                fontWeight: 400,
                color: '#2f353b'
              }
            },
            a: {
              color: 'black',
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': {
                color: 'black'
              }
            }
          }
        }}
      >
        <Nav />
      </Box>
      <Box
        sx={{
          gridArea: 'toc'
        }}
      ></Box>
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
            sx={{
              mt: '5px',
              ml: 'auto',
              color: 'inherit'
            }}
          >
            <GitHub size={18} />
          </a>
          <a
            href="https://github.com/blocks/blocks"
            sx={{
              mt: '5px',
              color: 'inherit',
              ml: 3
            }}
          >
            <Twitter size={18} />
          </a>
        </Container>
      </Box>
    </Box>
  </Styled.root>
)
