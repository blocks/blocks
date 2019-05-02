export const isCloseTag = (str = '') =>
  str.startsWith('</') || str.endsWith('/>')
export const isOpenTag = (str = '') => !isCloseTag(str) && str.endsWith('>')

export const getComponentName = (str = '') => {
  const match = str.match(/^\<?([\w\.\_]+)/)
  return match && match[1]
}
