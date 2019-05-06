import React from 'react'
import adaptiveGradient from 'adaptive-gradient'
import randomHex from 'random-hex-color'

const BackgroundGradient = ({
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

  const backgroundGradient = [angle, start, stop, end || gradient.end].join(' ')

  return (
    <div
      css={{
        backgroundGradient,
        background: start,
        color: gradient.fontShouldBeLight ? 'white' : 'black'
      }}
      {...props}
    />
  )
}

export default BackgroundGradient
