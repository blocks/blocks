module.exports = {
  siteMetadata: {
    title: 'Blocks UI',
    description:
      'A JSX-based page builder for creating beautiful websites without writing code',
    author: '@blocks_ui',
    image:
      'https://user-images.githubusercontent.com/1424573/69646923-d618b800-1025-11ea-8b0f-73286a8db5bf.png'
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
