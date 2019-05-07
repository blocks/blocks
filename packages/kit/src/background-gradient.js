/* @jsx jsx */
import { jsx } from '@emotion/core'
import adaptiveGradient from 'adaptive-gradient'
import randomHex from 'random-hex-color'

const BackgroundGradient = ({
  start = 'rebeccapurple',
  end,
  stop = '80%',
  angle = 30,
  random,
  ...props
}) => {
  if (random) {
    start = randomHex()
  }

  const gradient = adaptiveGradient(start)
  const gradientEnd = '#' + gradient.end
  const backgroundGradient = `
    linear-gradient(
      ${angle}deg,
      ${start},
      ${end || gradientEnd} ${stop}
    )
  `

  return (
    <div
      css={{
        backgroundColor: start,
        background: backgroundGradient,
        color: gradient.fontShouldBeLight ? 'white' : 'black',
        padding: 20
      }}
      {...props}
    />
  )
}

BackgroundGradient.propertyControls = {
  isVoid: false,
  start: {
    type: 'color'
  },
  end: {
    type: 'color'
  },
  stop: {
    type: 'string'
  },
  angle: {
    type: 'string'
  },
  random: {
    type: 'boolean'
  }
}

export default BackgroundGradient
