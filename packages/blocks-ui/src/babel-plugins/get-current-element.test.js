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

test('should update Plugin state with current element and track parent id', () => {
  const plugin = new Plugin()
  const expected = {
    id: 'ghi',
    name: 'HeaderBasic.Logo',
    parentId: 'def',
    props: {
      ___uuid: 'ghi',
      sx: {},
      to: '/'
    },
    text: 'Hello'
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
    { elementId: 'ghi' }
  )

  expect(plugin.state).toEqual({ element: expected })
})

test('should not update Plugin state with current element when id does not match any id', () => {
  const plugin = new Plugin()
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
    { elementId: 'jkl' }
  )

  expect(plugin.state).toEqual({ element: null })
})
