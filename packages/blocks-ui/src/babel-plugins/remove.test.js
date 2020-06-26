import { testPlugin } from './test-util'
import plugin from './remove'

test('should remove node when id matches', () => {
  const result = testPlugin(
    plugin,
    `<h1 ___uuid="abc" sx={{ pt: 1, pb: 2 }}>Hello, world!</h1>`,
    {
      elementId: 'abc'
    }
  )

  expect(result).toBe('')
})

test('should not remove node when id does not match', () => {
  const result = testPlugin(plugin, `<h1 ___uuid="abc">Hello, world!</h1>`, {
    elementId: 'def'
  })

  expect(result).toBe('<h1 ___uuid="abc">Hello, world!</h1>')
})
