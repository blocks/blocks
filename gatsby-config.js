module.exports = {
  siteMetadata: {
    title: 'Blocks UI',
    description:
      'A JSX-based page builder for creating beautiful websites without writing code',
    author: '@blocks_ui'
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
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['blocks-ui']
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
