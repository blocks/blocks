import { testPlugin } from './test-util'
import plugin from './apply-prop'

test('applies a string prop to the element', () => {
  const result = testPlugin(plugin, '<h1 ___uuid="abc">Hello, world!</h1>', {
    elementId: 'abc',
    key: 'foo',
    value: 'bar'
  })

  expect(result).toEqual(`<h1 ___uuid="abc" foo="bar">Hello, world!</h1>`)
})

test('applies a number prop to the element', () => {
  const result = testPlugin(plugin, '<h1 ___uuid="abc">Hello, world!</h1>', {
    elementId: 'abc',
    key: 'foo',
    value: 123
  })

  expect(result).toEqual(`<h1 ___uuid="abc" foo={123}>Hello, world!</h1>`)
})

test('applies a boolean prop to the element', () => {
  const result = testPlugin(plugin, '<h1 ___uuid="abc">Hello, world!</h1>', {
    elementId: 'abc',
    key: 'foo',
    value: true
  })

  expect(result).toEqual(`<h1 ___uuid="abc" foo={true}>Hello, world!</h1>`)
})
