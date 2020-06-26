import { testPlugin } from './test-util'
import plugin from './remove-imports'

test('should remove import decelerations', () => {
  const result = testPlugin(
    plugin,
    `import React from 'react'
export default () => (<Block.Root></Block.Root>)`
  )

  expect(result).toBe('export default (() => <Block.Root></Block.Root>)')
})

test('should not update source when no import declaration', () => {
  const result = testPlugin(
    plugin,
    `export default () => (<Block.Root></Block.Root>)`
  )

  expect(result).toBe('export default (() => <Block.Root></Block.Root>)')
})
