import React from 'react'

import Block from '../components/block'

export const pageQuery = graphql`
  query($id: String!) {
    block: block(id: { eq: $id }) {
      id
      displayName
      src
      transformedSrc
    }
  }
`

export default ({ data: { block } }) => <Block block={block} />
