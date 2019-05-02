import * as util from '../src/util'

const OPEN_TAGS = ['<Block>', '<Block foo="bar">']

const CLOSE_TAGS = ['<Block />', '</Block>']

OPEN_TAGS.forEach(tag => {
  test(`isOpenTag returns true for ${tag}`, () => {
    expect(util.isOpenTag(tag)).toBeTruthy()
  })

  test(`isCloseTag returns false for ${tag}`, () => {
    expect(util.isCloseTag(tag)).toBeFalsy()
  })
})

CLOSE_TAGS.forEach(tag => {
  test(`isOpenTag returns false for ${tag}`, () => {
    expect(util.isOpenTag(tag)).toBeFalsy()
  })

  test(`isCloseTag returns true for ${tag}`, () => {
    expect(util.isCloseTag(tag)).toBeTruthy()
  })
})

test('getComponentName returns the component name', () => {
  expect(util.getComponentName('<Block>')).toEqual('Block')
  expect(util.getComponentName('<Block style={{}}>')).toEqual('Block')
  expect(util.getComponentName('<Foo.Bar>')).toEqual('Foo.Bar')
})
