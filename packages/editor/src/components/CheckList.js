import React from 'react'
import styled from 'styled-components'

import { Flex, Text, theme } from 'unified-ui'

export const CheckList = styled.ul({
  listStyleType: 'none'
})

export const CheckListItemWrap = styled.span({
  display: 'block',
  margin: 0,
  '&:hover': {
    backgroundColor: theme.colors.grays[0]
  }
})

export const CheckListItem = ({ checked, onChange, ...props }) => (
  <CheckListItemWrap>
    <Flex as="span" alignItems="center">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <Text
        as="span"
        {...props}
        fontSize={2}
        checked={checked}
        style={{
          color: checked ? theme.colors.grays[8] : theme.black,
          textDecoration: checked
            ? `line-through solid ${theme.colors.grays[9]}`
            : 'none'
        }}
      />
    </Flex>
  </CheckListItemWrap>
)
