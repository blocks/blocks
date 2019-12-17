module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  plugins: ['jest'],
  rules: {
    'import/no-unresolved': 'off',
    'no-console': 'off',
    'no-case-declarations': 'off',
    'no-prototype-builtins': 'off',
    'no-unsafe-finally': 'off',
    'import/order': [
      'error',
      { 'newlines-between': 'always-and-inside-groups' }
    ],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/no-children-prop': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off'
  },
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:jest/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    },

    'import/extensions': ['.js', '.jsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx']
      }
    }
  }
}
