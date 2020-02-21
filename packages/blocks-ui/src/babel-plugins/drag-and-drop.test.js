import { testPlugin } from './test-util'
import plugin from './drag-and-drop'

test('add drag and drop wrapper to blocks root component', () => {
  const result = testPlugin(
    plugin,
    `<Blocks.Root><h1 ___uuid="abc">Hello, world!</h1></Blocks.Root>`
  )

  expect(result).toEqual(
    `<BLOCKS_Root><BLOCKS_Draggable key='abc' draggableId='abc' index={0}>
    {(provided, snapshot) => <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}><h1 ___uuid="abc">Hello, world!</h1></div>}
  </BLOCKS_Draggable></BLOCKS_Root>`
  )
})

test('should not add drag and drop wrapper to non blocks root component', () => {
  const result = testPlugin(plugin, `<h1 ___uuid="abc">Hello, world!</h1>`)

  expect(result).toEqual(`<h1 ___uuid="abc">Hello, world!</h1>`)
})
