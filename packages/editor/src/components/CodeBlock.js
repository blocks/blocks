import React from 'react'
import styled from '@emotion/styled'
import { css } from 'theme-ui'

const Pre = styled.pre(
  css({
    bg: 'lightgray',
    p: 3,
    fontFamily: 'monospace'
  })
)

export default ({ children, ...props }) => <Pre {...props}>{children}</Pre>
