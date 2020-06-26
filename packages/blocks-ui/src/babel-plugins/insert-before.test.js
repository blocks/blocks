import { testPlugin } from './test-util'
import plugin from './insert-before'

test('should insert template ast before node', () => {
  const result = testPlugin(plugin, `<div ___uuid="abc">Hello, world!</div>`, {
    elementId: 'abc'
  })
  expect(result).toContain(
    '<h1>hello!</h1>\n<div ___uuid="abc">Hello, world!</div>'
  )
})

test('should not insert template ast before node when id is not in scope', () => {
  const result = testPlugin(plugin, `<div ___uuid="abc">Hello, world!</div>`, {
    elementId: 'efg'
  })
  expect(result).toContain('<div ___uuid="abc">Hello, world!</div>')
})
