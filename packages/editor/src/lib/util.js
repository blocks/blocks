import escapeRegexp from 'escape-string-regexp'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'

export { default as isUrl } from 'is-url'

export const isAllChar = (char, str) =>
  new RegExp('^(' + escapeRegexp(char) + '){1,}$').test(str)

export const isImageUrl = (str = '') => {
  if (!isUrl(str)) {
    return false
  }

  return !!imageExtensions.find(ext => str.endsWith(ext))
}

export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://compositor-api.herokuapp.com'
    : 'http://localhost:4000'

export const redirect = (target, ctx = {}) => {
  if (ctx.res) {
    ctx.res.writeHead(303, { Location: target })
    ctx.res.end()
  } else {
    window.location = target
  }
}

export const getTypeFromMarkdown = chars => {
  switch (chars) {
    case '*':
    case '-':
    case '+':
      return 'list-item'
    case '>':
      return 'block-quote'
    case '#':
      return 'heading-one'
    case '##':
      return 'heading-two'
    case '###':
      return 'heading-three'
    case '####':
      return 'heading-four'
    case '#####':
      return 'heading-five'
    case '######':
      return 'heading-six'
    case '---':
      return 'hr'
    case '---|---':
    case '--- |---':
    case '---| ---':
    case '--- | ---':
      return 'table'
    case '```':
      return 'pre'
    case '```jsx':
      return 'jsx'
    case '[]':
    case '[ ]':
    case '[x]':
    case '[X]':
      return 'check-list-item'
    default:
      return null
  }
}
