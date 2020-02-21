import { testPlugin } from './test-util'
import plugin from './apply-sx-prop'

test('applies prop to the sx object', () => {
  const result = testPlugin(plugin, '<h1 ___uuid="abc">Hello, world!</h1>', {
    elementId: 'abc',
    sx: {
      backgroundColor: 'tomato'
    }
  })

  expect(result).toEqual(
    `<h1 ___uuid="abc" sx={{
  backgroundColor: "tomato"
}}>Hello, world!</h1>`
  )
})

test('applies a falsey prop to the sx object', () => {
  const result = testPlugin(plugin, '<h1 ___uuid="abc">Hello, world!</h1>', {
    elementId: 'abc',
    sx: {
      fontSize: 0
    }
  })

  expect(result).toEqual(
    `<h1 ___uuid="abc" sx={{
  fontSize: 0
}}>Hello, world!</h1>`
  )
})

test('should remove sx value when undefined', () => {
  const result = testPlugin(plugin, '<h1 ___uuid="abc">Hello, world!</h1>', {
    elementId: 'abc',
    sx: {
      pt: 3,
      pr: undefined,
      fontSize: 0
    }
  })

  expect(result).toEqual(
    `<h1 ___uuid="abc" sx={{
  pt: 3,
  fontSize: 0
}}>Hello, world!</h1>`
  )
})
