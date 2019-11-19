module.exports = {
  siteMetadata: {
    title: 'Blocks',
    description:
      'A JSX-based page builder for creating beautiful websites without writing code'
  },
  plugins: [
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blocks',
        path: 'packages/blocks/src'
      }
    },
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        siteId: 'YFORTJIX'
      }
    }
  ]
}
