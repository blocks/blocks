module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['@blocks/editor', 'theme-ui']
      }
    }
  ]
}
