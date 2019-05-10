import { serializer, parseMDX } from '../src'

const FIXTURE = `
# Hello, __world!__

<Block>

## Other

Stuff

</Block>

And more stuff
`

test('correctly serializes MDX to Slate schema', () => {
  const result = serializer.deserialize(parseMDX(FIXTURE))

  expect(result.toJSON()).toMatchSnapshot()
})

test('correctly passes props in JSX blocks', () => {
  const result = serializer.deserialize(parseMDX('<YouTube id="1234" />'))

  expect(result.toJSON()).toMatchSnapshot()
})
