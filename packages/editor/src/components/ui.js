import styled from 'styled-components'

import {
  Heading,
  Text,
  Box,
  Flex,
  Image,
  Input,
  Button,
  Icon
} from 'unified-ui'
export { Heading, Text, Box, Flex, Image, Input, Button, Icon }

export { ListView, ListViewItem } from './ListView'

export const Container = styled(Box)`
  max-width: 800px;
  margin: auto;
`

export const Link = ({ href, ...props }) => (
  <React.Fragment href={href}>
    <Text as="a" fontSize={2} {...props} />
  </React.Fragment>
)

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
