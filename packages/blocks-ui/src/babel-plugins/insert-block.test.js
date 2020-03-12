import { testPlugin } from './test-util'
import plugin from './insert-block'

test('should insert template ast at destination.index', () => {
  const result = testPlugin(plugin, `<Blocks.Root></Blocks.Root>`, {
    destination: {
      droppableId: 'root',
      index: 0
    },
    block: {
      name: 'HeaderBasic',
      usage: `<HeaderBasic ___uuid="abc">Hello, world!</HeaderBasic>`
    }
  })

  expect(result).toContain(
    '<Blocks.Root><HeaderBasic ___uuid="abc">Hello, world!</HeaderBasic></Blocks.Root>'
  )
})

test('should throw when block usage incorrect', () => {
  const result = testPlugin(plugin, `<Blocks.Root></Blocks.Root>`, {
    destination: {
      droppableId: 'root',
      index: 0
    },
    block: { name: undefined }
  })

  expect(result).toBe(`<Blocks.Root><div sx={{
    p: 2
  }}>
    <span sx={{
      fontSize: 2
    }}>
      Failed to compile undefined
    </span>

    <pre sx={{
      mb: 0,
      backgroundColor: 'rgba(206, 17, 38, 0.05)',
      fontSize: '8pt'
    }}>
      {'"Unexpected template param undefined"'}
    </pre>
  </div></Blocks.Root>`)
})

test('should not insert block when no destination defined', () => {
  const result = testPlugin(plugin, `<Blocks.Root></Blocks.Root>`, {
    destination: null,
    block: {
      name: 'HeaderBasic',
      usage: `<HeaderBasic ___uuid="abc">Hello, world!</HeaderBasic>`
    }
  })

  expect(result).toContain('<Blocks.Root></Blocks.Root>')
})
