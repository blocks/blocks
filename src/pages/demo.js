import React from 'react'
import Editor from 'blocks-ui/src'
import * as Blocks from '@blocks/react/src'

const JSX = `
import React from 'react'
import { HeaderBasic } from '@blocks/react'

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

const PageLayout = props => {
  // Anything you want inserted into the Page/Canvas should be done here
  return <div {...props} />
}

const BlockLayout = props => {
  // Anything you want inserted into the Block preview should be done here
  return <div {...props} />
}

export default () => (
  <Editor
    src={JSX}
    blocks={Blocks}
    onChange={console.log}
    layouts={{ Page: PageLayout, Block: BlockLayout }}
  />
)
