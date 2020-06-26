import { testPlugin } from './test-util'
import Plugin from './get-exported-elements'

test('should update internal Plugin state with ExportNamedDeclaration definitions', () => {
  const plugin = new Plugin()
  expect(plugin.state).toEqual({ elements: {} })

  testPlugin(plugin.plugin, `export const HeaderBasic = () => <div></div>`)

  expect(plugin.state.elements).toMatchSnapshot()
})

test('should not updated internal Plugin state when no named exports in tree', () => {
  const plugin = new Plugin()
  expect(plugin.state).toEqual({ elements: {} })

  testPlugin(
    plugin.plugin,
    `const HeaderBasic = () => <div></div>
export default HeaderBasic
    `
  )

  expect(plugin.state).toEqual({ elements: {} })
})
