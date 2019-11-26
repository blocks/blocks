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
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Blocks UI`,
        short_name: `Blocks`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#33e`,
        display: `standalone`,
        icon: `src/assets/images/favicon.png`
      }
    }
  ]
}
