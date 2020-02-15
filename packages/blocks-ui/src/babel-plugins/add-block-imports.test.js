import { testPlugin } from './test-util'
import plugin from './add-block-imports'

test('add additional blocks named imports', () => {
  const result = testPlugin(
    plugin,
    'import React from "react"\nimport { Blocks } from "@blocks/react"',
    {
      blocks: [{ name: 'HeaderBasic' }]
    }
  )

  expect(result).toEqual(
    `import React from "react";\nimport { Blocks, HeaderBasic } from "@blocks/react"`
  )
})

test('should not update non block ImportDeclaration', () => {
  const result = testPlugin(plugin, 'import React from "react"')

  expect(result).toEqual(`import React from "react"`)
})
