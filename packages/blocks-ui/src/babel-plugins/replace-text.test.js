import { testPlugin } from './test-util'
import plugin from './replace-text'

test('should replace text on node', () => {
  const result = testPlugin(plugin, `<div ___uuid="abc">hello world</div>`, {
    elementId: 'abc',
    text: 'Hello, world!'
  })

  expect(result).toBe('<div ___uuid="abc">Hello, world!</div>')
})

test('should not replace text when id does not match nodes id', () => {
  const result = testPlugin(plugin, `<div ___uuid="abc">hello world</div>`, {
    elementId: 'efg',
    text: 'Hello, world!'
  })

  expect(result).toBe('<div ___uuid="abc">hello world</div>')
})
