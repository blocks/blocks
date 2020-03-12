import { testPlugin } from './test-util'
import Plugin from './get-blocks-usage'

test('should update internal Plugin state with JSX usage', () => {
  const plugin = new Plugin()
  expect(plugin.state).toEqual({ usage: null })

  testPlugin(
    plugin.plugin,
    `HeaderLogo.usage = \`<HeaderLogo></HeaderLogo>\`
export default HeaderLogo`
  )

  expect(plugin.state).toEqual({ usage: '<HeaderLogo></HeaderLogo>' })
})

test('should not update internal Plugin state when no Blocks with usage', () => {
  const plugin = new Plugin()
  expect(plugin.state).toEqual({ usage: null })

  testPlugin(plugin.plugin, `export default HeaderLogo`)

  expect(plugin.state).toEqual({ usage: null })
})
