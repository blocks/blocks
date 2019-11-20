import React from 'react'
import { graphql } from 'gatsby'

import Block from '../components/block'

export const pageQuery = graphql`
  query($id: String!) {
    block: block(id: { eq: $id }) {
      id
      displayName
      src
      transformed
    }
  }
`

export default ({ data: { block } }) => <Block block={block} />
