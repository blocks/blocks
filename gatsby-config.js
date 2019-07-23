module.exports = {
  siteMetadata: {
    title: 'Blocks',
    description: 'An MDX-based WYSIWYG for the content web'
  },
  plugins: [
    'gatsby-theme-documentation',
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        siteId: 'YFORTJIX'
      }
    }
  ]
}
