import { testPlugin } from './test-util'
import plugin from './remove-tuid'

test('removes uuid for div', () => {
  const result = testPlugin(plugin, `<div ___uuid="abc">Hello, world!</div>`)
  expect(result).toContain('<div>Hello, world!</div>')
})
