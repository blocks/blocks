import * as t from '@babel/types'

export const uuid = (
  a // placeholder
) => {
  return a // if the placeholder was passed, return
    ? // a random number from 0 to 15
      (
        a ^ // unless b is 8,
        ((Math.random() * // in which case
          16) >> // a random number from
          (a / 4))
      ) // 8 to 11
        .toString(16) // in hexadecimal
    : // or otherwise a concatenated string:
      (
        [1e7] + // 10000000 +
        -1e3 + // -1000 +
        -4e3 + // -4000 +
        -8e3 + // -80000000 +
        -1e11
      ) // -100000000000,
        .replace(
          // replacing
          /[018]/g, // zeroes, ones, and eights with
          uuid // random hex digits
        )
}

// Leave last space on a string since a user could
// be in the middle of typing into a text input
export const textTrim = str =>
  str
    .replace(/^\s*/, '')
    .replace(/\s{1,}$/, ' ')
    .replace(/\s+/g, ' ')

export const getElementName = node => {
  const elementName = node.name

  if (t.isJSXMemberExpression(elementName)) {
    return [elementName.object.name, elementName.property.name].join('.')
  } else {
    return elementName.name
  }
}

export const getUuid = node => {
  const id = node.attributes.find(
    node => node && node.name && node.name.name === '___tuid'
  )

  return id && id.value.value
}
