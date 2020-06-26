import { testPlugin } from './test-util'
import plugin from './set-default-export-to-container'

test('should convert default export declaration to BLOCKS_Container', () => {
  const result = testPlugin(
    plugin,
    `export default () => <div>Hello, world!</div>`
  )

  expect(result).toBe('const BLOCKS_Container = () => <div>Hello, world!</div>')
})

test('should ignore non default export declarations', () => {
  const result = testPlugin(
    plugin,
    `export const Test = () => <div>Hello, world!</div>`
  )

  expect(result).toBe('export const Test = () => <div>Hello, world!</div>')
})
