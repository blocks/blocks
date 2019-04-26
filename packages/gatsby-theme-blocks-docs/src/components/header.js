import React from 'react'
import { Link } from 'gatsby'
import css from '@styled-system/css'
import pkg from '@blocks/editor/package.json'
import Burger from './burger'
import theme from './theme'
import DarkToggle from './dark-toggle'
import Search from './search'

const MenuButton = props => (
  <button
    title="Toggle Menu"
    {...props}
    css={css({
      appearance: 'none',
      border: 0,
      color: 'inherit',
      p: 2,
      bg: 'transparent',
      borderRadius: 4,
      '&:focus': {
        outline: '1px solid'
      },
      [theme.mediaQueries.big]: {
        display: 'none'
      }
    })}
  >
    <Burger />
  </button>
)

export default ({ toggleMenu, dark, setDark }) => (
  <header
    css={css({
      display: 'flex',
      alignItems: 'center',
      fontSize: 14
    })}
  >
    <Link
      to="/"
      css={css({
        display: 'flex',
        alignItems: 'center',
        p: 3,
        color: 'inherit',
        fontWeight: 'bold',
        textDecoration: 'none'
      })}
    >
      Blocks v{pkg.version}
    </Link>
    <div css={{ margin: 'auto' }} />
    <Search />
    <a
      href="https://github.com/blocks/blocks"
      css={css({
        display: 'flex',
        alignItems: 'center',
        p: 3,
        color: 'inherit'
      })}
    >
      <img
        src={`https://icon.now.sh/github/24/${dark ? 'fff' : '000'}`}
        alt="GitHub logo"
      />
    </a>
    <DarkToggle dark={dark} setDark={setDark} />
    <MenuButton
      onClick={toggleMenu}
      css={css({
        mr: 2
      })}
    />
  </header>
)
