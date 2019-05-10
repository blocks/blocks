export const isCloseTag = (str = '') =>
  str.startsWith('</') || str.endsWith('/>')
export const isOpenTag = (str = '') => !isCloseTag(str) && str.endsWith('>')

export const getComponentName = (str = '') => {
  const match = str.match(/^\<?([\w\.\_]+)/)
  return match && match[1]
}

export const toJS = map => {
  if (typeof map.toJS !== 'function') return map
  return map.toJS()
}
