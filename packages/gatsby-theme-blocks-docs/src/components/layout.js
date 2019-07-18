import React, { useState, useEffect } from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'theme-ui'
import * as Kit from '@blocks/kit'
import css from '@styled-system/css'

import mdxComponents from './mdx-components'
import TableOfProps from './table-of-props'
import SidebarContent from './sidebar.mdx'
import Header from './header'
import Pagination from './pagination'
import EditLink from './edit-link'
import { SkipNavLink, SkipNavContent } from './skip-nav'
import baseTheme from './theme'

const components = {
  TableOfProps,
  ...Kit,
  ...mdxComponents
}

const styles = (
  <Global
    styles={css({
      '*': { boxSizing: 'border-box' },
      body: {
        m: 0,
        fontFamily: 'system-ui, sans-serif',
        lineHeight: 1.5,
        color: 'text',
        bg: 'background',
        transitionProperty: 'background-color',
        transitionTimingFunction: 'ease-out',
        transitionDuration: '.4s'
      }
    })}
  />
)

const Root = props => (
  <div
    {...props}
    css={css({
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    })}
  />
)
const Main = props => (
  <main
    {...props}
    css={css({
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      flex: '1 1 auto',
      [baseTheme.mediaQueries.big]: {
        flexDirection: 'row'
      }
    })}
  />
)
const Sidebar = ({ open, ...props }) => (
  <div
    {...props}
    css={css({
      display: open ? 'block' : 'none',
      position: 'relative',
      maxHeight: '100vh',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      bg: 'background',
      transition: 'background-color .4s ease-out',
      pb: 4,
      '& ul': {
        listStyle: 'none',
        paddingLeft: 16
      },
      '& li > ul': {
        pt: 2
      },
      '& li': {
        py: 2
      },
      '& a': {
        color: 'inherit',
        fontWeight: 'bold',
        textDecoration: 'none'
      },
      '& a.active': {
        color: 'primary'
      },
      [baseTheme.mediaQueries.big]: {
        display: 'block',
        width: 256,
        minWidth: 0,
        flex: 'none',
        position: 'sticky',
        top: 0
      }
    })}
  />
)
const Overlay = props =>
  props.open && (
    <div
      {...props}
      css={css({
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      })}
    />
  )
const Container = props => (
  <div
    {...props}
    css={css({
      minWidth: 0,
      width: '100%',
      maxWidth: 1024,
      mx: 'auto',
      p: 4
    })}
  />
)
export default props => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const initialDark = window.localStorage.getItem('dark') === 'true'
    if (initialDark !== dark) {
      setDark(initialDark)
    }
  }, [])
  useEffect(() => {
    window.localStorage.setItem('dark', dark)
  }, [dark])
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const closeMenu = () => {
    setMenuOpen(false)
  }
  const theme = {
    ...baseTheme,
    dark,
    colors: dark ? baseTheme.colors.dark : baseTheme.colors,
    prism: dark ? baseTheme.prism.dark : baseTheme.prism
  }
  return (
    <>
      <ThemeProvider theme={theme} components={components}>
        <SkipNavLink />
        {styles}
        <Root>
          <Overlay open={menuOpen} onClick={closeMenu} />
          <Header toggleMenu={toggleMenu} dark={dark} setDark={setDark} />
          <Main>
            <Sidebar onClick={closeMenu} open={menuOpen}>
              <SidebarContent />
            </Sidebar>
            <Container className="searchable-content">
              <SkipNavContent />
              {props.children}
              <EditLink />
              <Pagination />
            </Container>
          </Main>
        </Root>
      </ThemeProvider>
    </>
  )
}
