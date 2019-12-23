import React from 'react'

export const Blocks = {
  Root: ({ layout: Layout = React.Fragment, ...props }) => {
    return <Layout {...props} />
  }
}
