import { testPlugin } from './test-util'
import plugin from './insert-after'

test('should insert template ast after node', () => {
  const result = testPlugin(plugin, `<div ___uuid="abc">Hello, world!</div>`, {
    elementId: 'abc'
  })
  expect(result).toContain(
    '<div ___uuid="abc">Hello, world!</div>;\n<h1>hello!</h1>'
  )
})

test('should not insert template ast after node when id does not exist', () => {
  const result = testPlugin(plugin, `<div ___uuid="abc">Hello, world!</div>`, {
    elementId: 'efg'
  })
  expect(result).toContain('<div ___uuid="abc">Hello, world!</div>')
})
