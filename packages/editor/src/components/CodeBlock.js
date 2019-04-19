import React from 'react'
import styled from '@emotion/styled'

const Pre = styled.pre`
  background-color: #fafafa;
  padding: 16px;
  font-family: Monaco, Consolas, monospace;
  span {
    font-family: Monaco, Consolas, monospace;
  }
`

export default ({ children }) => <Pre>{children}</Pre>
