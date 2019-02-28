import React from 'react'
import styled from 'styled-components'
import { borderColor, themeGet } from 'styled-system'

import { Flex, Link } from 'unified-ui'

export const ListViewItem = styled(Flex)`
  border-bottom: thin solid;
  cursor: pointer;
  width: 100%;
  &:hover ${Link} {
    color: ${themeGet('colors.grays.8')};
  }
  ${borderColor};
`

ListViewItem.displayName = 'ListViewItem'
ListViewItem.defaultProps = {
  borderColor: 'grays.1',
  alignItems: 'center',
  px: 3,
  py: 3
}

export const ListView = styled(Flex)`
  border-top: thin solid;
  flex-direction: column;
  ${borderColor};
`

ListView.displayName = 'ListView'
ListView.defaultProps = {
  borderColor: 'grays.1'
}
