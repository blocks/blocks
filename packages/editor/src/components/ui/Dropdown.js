/** @jsx jsx */
import React from 'react'
import { jsx, Global } from '@emotion/core'
import { css } from 'theme-ui'
import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button'

// css prop doesn't work with reach ui
// styles must be global due to how portals are used
const styles = css({
  ':root': {
    '--reach-menu-button': 1
  },
  '[data-reach-menu]': {
    display: 'block',
    position: 'absolute'
  },
  '[data-reach-menu-list]': {
    display: 'block',
    whiteSpace: 'nowrap',
    border: '1px solid lightgray',
    backgroundColor: 'white',
    outline: 'none'
  },
  '[data-reach-menu-item]': {
    display: 'block',
    cursor: 'pointer',
    color: 'inherit',
    fontSize: 1,
    fontWeight: 'bold',
    textDecoration: 'initial',
    p: 1,
    '&[data-selected]': {
      color: 'white',
      bg: 'primary',
      outline: 'none'
    }
  }
})

export const Dropdown = ({ label, options = [], onSelect, ...props }) => {
  return (
    <>
      <Global styles={styles} />
      <Menu {...props}>
        <MenuButton
          css={css({
            fontFamily: 'inherit',
            fontSize: 1,
            fontWeight: 'bold',
            m: 0,
            px: 2,
            py: 2,
            color: 'inherit',
            bg: 'transparent',
            border: 0,
            '&:focus': {
              outline: '2px solid'
            }
          })}
        >
          {label} <span aria-hidden>▾</span>
        </MenuButton>
        <MenuList>
          {options.map((opt, i) => (
            <MenuItem
              key={i}
              style={styles.item}
              onSelect={e => {
                onSelect(opt)
              }}
              children={opt}
            />
          ))}
        </MenuList>
      </Menu>
    </>
  )
}

export default Dropdown
