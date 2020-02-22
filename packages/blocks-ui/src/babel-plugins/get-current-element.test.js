import { testPlugin } from './test-util'
import Plugin from './get-current-element'

test('should update internal Plugin state with current selected element', () => {
  const plugin = new Plugin()
  const expected = {
    id: 'abc',
    parentId: undefined,
    children: [
      {
        id: 'def',
        name: 'HeaderBasic.Nav'
      }
    ],
    name: 'HeaderBasic',
    props: {
      ___uuid: 'abc',
      sx: {}
    }
  }
  expect(plugin.state).toEqual({ element: null })

  testPlugin(
    plugin.plugin,
    `<Blocks.Root>
      <HeaderBasic ___uuid="abc">
        <HeaderBasic.Nav ___uuid="def">
          <HeaderBasic.Logo to="/" ___uuid="ghi">Hello</HeaderBasic.Logo>
        </HeaderBasic.Nav>
      </HeaderBasic>
    </Blocks.Root>`,
    { elementId: 'abc' }
  )

  expect(plugin.state).toEqual({ element: expected })
})
