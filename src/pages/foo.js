import React from 'react'
import { Blocks, HeaderBasic } from '@blocks/react'
export default () => (
  <Blocks.Root>
    <HeaderBasic justifyContent="space-between">
      <HeaderBasic.Logo
        to="/"
        sx={{
          fontSize: 5,
          fontWeight: 'bold',
          color: 'highlight',
          bg: 'primary'
        }}
      >
        Hello
      </HeaderBasic.Logo>
      <HeaderBasic.Nav>
        <HeaderBasic.Link to="/about">About</HeaderBasic.Link>
        <HeaderBasic.Link to="/blog">Blog</HeaderBasic.Link>
        <HeaderBasic.Link to="/contact">Contact</HeaderBasic.Link>
      </HeaderBasic.Nav>
    </HeaderBasic>
  </Blocks.Root>
)
