import { parseMDX } from '../src'

const FIXTURE = `
# Hello, __world!__

<Block>

## Other

Stuff

</Block>
`

test('it parses a basic block', () => {
  const result = parseMDX('# Hello, world!')

  expect(result).toMatchSnapshot()
})
