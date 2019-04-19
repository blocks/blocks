import styled from '@emotion/styled'

import { Heading, Text, Input, Button, Icon } from 'unified-ui'
export { Heading, Text, Input, Button, Icon }

export { Styled, css } from 'theme-ui'
export { Flex, Box } from 'theme-ui/layout'

export { ListView, ListViewItem } from './ListView'

export const Container = styled.div`
  max-width: 800px;
  margin: auto;
`

export const ClearInput = styled.input({
  appearance: 'none',
  WebkitAppearance: 'none',
  border: 'none',
  fontSize: '24px',
  fontWeight: 600,
  marginTop: '64px',
  marginBottom: '24px',
  '&:focus': {
    outline: 'none'
  }
})
