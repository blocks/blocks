import React from 'react'
import styled from '@emotion/styled'

import { Flex, Styled } from './ui'

export const CheckList = styled.ul({
  listStyleType: 'none'
})

export const CheckListItemWrap = styled.span({
  display: 'block',
  margin: 0
})

export const CheckListItem = ({ checked, onChange, ...props }) => (
  <CheckListItemWrap>
    <Flex as="span" alignItems="center">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <Styled.p
        as="span"
        {...props}
        fontSize={2}
        checked={checked}
        style={{
          textDecoration: checked ? `line-through solid black` : 'none'
        }}
      />
    </Flex>
  </CheckListItemWrap>
)
