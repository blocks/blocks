import React, { Fragment } from 'react'
import Editor from 'blocks-ui'
import * as Blocks from '@blocks/react'

import SEO from '../components/seo'

const JSX = `
import React from 'react'
import { Blocks, HeaderBasic } from '@blocks/react'

export default () => (
  <Blocks.Root>
    <HeaderBasic sx={{ p: 3 }}>
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

const Layout = props => {
  return <div className="layout">{props.children}</div>
}

const Demo = () => (
  <Fragment>
    <SEO title="Demo" />
    <Editor src={JSX} blocks={Blocks} layout={Layout} />
  </Fragment>
)

export default Demo
