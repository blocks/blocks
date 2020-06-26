import { testPlugin } from './test-util'
import plugin from './remove-named-exports'

test('should remove named export decelerations', () => {
  const result = testPlugin(plugin, `export const Block = 'abc'`)

  expect(result).toBe(`const Block = 'abc'`)
})

test('should export as default', () => {
  const result = testPlugin(plugin, `export { Block as default } from '.'`)

  expect(result).toBe("export { Block as default } from '.'")
})
