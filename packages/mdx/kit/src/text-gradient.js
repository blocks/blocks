/* @jsx jsx */
import { jsx } from '@emotion/core'
import adaptiveGradient from 'adaptive-gradient'
import randomHex from 'random-hex-color'

const TextGradient = ({
  start = 'rebeccapurple',
  end,
  stop = '60%',
  angle = 90,
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
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
      {...props}
    />
  )
}

TextGradient.propertyControls = {
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

export default TextGradient
