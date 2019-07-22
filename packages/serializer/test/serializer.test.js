import { deserialize } from '../src'

const FIXTURE = `
# Hello, __world*!*__

<Block>

## Here's another *heading*

Stuff

</Block>

And more stuff

- apples
- oranges
- potato
`

test('correctly serializes MDX to Slate schema', () => {
  const result = deserialize(FIXTURE)

  expect(result.toJSON()).toMatchSnapshot()
})

// test('correctly passes props in JSX blocks', () => {
//   const result = deserialize('<YouTube id="1234" />')
//
//   expect(result.toJSON()).toMatchSnapshot()
// })
