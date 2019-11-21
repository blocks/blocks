import React from 'react'
import Editor from 'blocks-ui/src'
import * as Blocks from '@blocks/blocks/src'

const JSX = `
import React from 'react'
import { HeaderBasic } from '@blocks/blocks'

export default () => (
  <Blocks.Root>
    <HeaderBasic>
      <HeaderBasic.Logo to="/">Hello</HeaderBasic.Logo>
      <HeaderBasic.Nav>
        <HeaderBasic.Link to="/about">About</HeaderBasic.Link>
        <HeaderBasic.Link to="/blog">Blog</HeaderBasic.Link>
        <HeaderBasic.Link to="/contact">Contact</HeaderBasic.Link>
      </HeaderBasic.Nav>
    </HeaderBasic>
  </Blocks.Root>
)
`

export default () => <Editor src={JSX} blocks={Blocks} />
