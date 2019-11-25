import { parseMDX } from '../src'

const FIXTURE = `
# Hello, __world!__

<Block>

## Other

Stuff

</Block>

And more stuff
`

test('parses a basic block', () => {
  const result = parseMDX('# Hello, world!')

  expect(result).toMatchSnapshot()
})

test('handles an interleaved block', () => {
  const result = parseMDX(FIXTURE)

  expect(result).toMatchSnapshot()
})
