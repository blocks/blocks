import styled from '@emotion/styled'
import { Flex } from 'theme-ui/layout'

export const ListViewItem = styled(Flex)`
  border-bottom: thin solid;
  cursor: pointer;
  width: 100%;
`

ListViewItem.displayName = 'ListViewItem'
ListViewItem.defaultProps = {
  alignItems: 'center',
  px: 3,
  py: 3
}

export const ListView = styled(Flex)`
  border-top: thin solid;
  flex-direction: column;
`

ListView.displayName = 'ListView'
