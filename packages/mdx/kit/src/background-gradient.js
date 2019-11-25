/** @jsx jsx */
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
    type: 'color',
    description: 'Starting color'
  },
  end: {
    type: 'color',
    description: 'Ending color'
  },
  stop: {
    type: 'string',
    description: 'Blending stopping point'
  },
  angle: {
    type: 'string',
    description: 'Angle of the gradient'
  },
  random: {
    type: 'boolean',
    description: 'Randomize the gradient'
  }
}

export default BackgroundGradient
