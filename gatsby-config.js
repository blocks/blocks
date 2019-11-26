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
    'gatsby-plugin-catch-links',
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
        siteId: 'ZGBAXRBH'
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Blocks UI',
        short_name: 'Blocks',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#33e',
        display: 'standalone',
        icon: 'src/assets/images/favicon.png'
      }
    }
  ]
}
