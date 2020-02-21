import { testPlugin } from './test-util'
import Plugin from './get-blocks'

test('should update internal Plugin state with root block children name and id', () => {
  const plugin = new Plugin()
  expect(plugin.state).toEqual({ blocks: [] })

  testPlugin(
    plugin.plugin,
    `<Blocks.Root><HeaderBasic ___uuid="abc">Hello, world!</HeaderBasic></Blocks.Root>`
  )

  expect(plugin.state).toEqual({ blocks: [{ id: 'abc', name: 'HeaderBasic' }] })
})

test('should not update internal Plugin state when no Blocks Root element preset', () => {
  const plugin = new Plugin()
  expect(plugin.state).toEqual({ blocks: [] })

  testPlugin(
    plugin.plugin,
    `<HeaderBasic ___uuid="abc">Hello, world!</HeaderBasic>`
  )

  expect(plugin.state).toEqual({ blocks: [] })
})
