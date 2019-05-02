export const isCloseTag = (str = '') =>
  str.startsWith('</') || str.endsWith('/>')
export const isOpenTag = (str = '') => !isCloseTag(str) && str.endsWith('>')
