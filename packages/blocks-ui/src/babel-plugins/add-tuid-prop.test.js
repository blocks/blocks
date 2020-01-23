import { testPlugin } from './test-util'
import plugin from './add-tuid-prop'

test('adds uuid to JSX elements', () => {
  const result = testPlugin(plugin, '<h1>Hello, world!</h1>')

  expect(result).toMatch(/___uuid/)
})

test('ignores uuid if it already exists', () => {
  const result = testPlugin(plugin, '<h1 ___uuid="abc">Hello, world!</h1>')

  expect(result).toEqual('<h1 ___uuid="abc">Hello, world!</h1>')
})
