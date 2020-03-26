import { testPlugin } from './test-util'
import plugin from './remove-sx-prop'

test('should remove sx property', () => {
  const result = testPlugin(
    plugin,
    `<div ___uuid="abc" sx={{ pt: 4, mb: 5 }}>Hello, world!</div>`,
    {
      elementId: 'abc',
      key: 'pt'
    }
  )

  expect(result).toBe(`<div ___uuid="abc" sx={{
  mb: 5
}}>Hello, world!</div>`)
})

test('should not remove sx property when elementId does not match', () => {
  const result = testPlugin(
    plugin,
    `<div ___uuid="abc" sx={{ pt: 4, mb: 5 }}>Hello, world!</div>`,
    {
      elementId: 'efg',
      key: 'pt'
    }
  )

  expect(result).toBe(`<div ___uuid="abc" sx={{
  pt: 4,
  mb: 5
}}>Hello, world!</div>`)
})

test('should not remove sx property sx property does not exist', () => {
  const result = testPlugin(
    plugin,
    `<div ___uuid="abc" sx={{ pt: 4, mb: 5 }}>Hello, world!</div>`,
    {
      elementId: 'abc',
      key: 'mt'
    }
  )

  expect(result).toBe(`<div ___uuid="abc" sx={{
  pt: 4,
  mb: 5
}}>Hello, world!</div>`)
})
