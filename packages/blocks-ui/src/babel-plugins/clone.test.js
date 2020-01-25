import { testPlugin } from './test-util'
import plugin from './clone'

test('clones the element', () => {
  const result = testPlugin(
    plugin,
    `
      <div>
        <h1 ___uuid="abc">Hello, world!</h1>
      </div>
    `,
    {
      elementId: 'abc'
    }
  )

  expect(result).toContain('<h1 ___uuid="abc">Hello, world!</h1><h1 ___uuid')
  expect(result).not.toContain(
    '<h1 ___uuid="abc">Hello, world!</h1><h1 ___uuid="abc"'
  )
})

test('updates child element uuids', () => {
  const result = testPlugin(
    plugin,
    `
      <div>
        <h1 ___uuid="abc">
          Hello, <em ___uuid="123">world!</em>
        </h1>
      </div>
    `,
    {
      elementId: 'abc'
    }
  )

  // Only match one child element
  const substrs = result.split('<em ___uuid="123">world!</em>')
  expect(substrs.length).toEqual(2)
})
