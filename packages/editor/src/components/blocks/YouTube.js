/** @jsx jsx */
import { jsx } from '@emotion/core'
import Player from 'react-youtube'
import isURL from 'is-url'
import getYouTubeID from 'get-youtube-id'

const Wrapper = props => (
  <div
    {...props}
    css={{
      width: '100%',
      height: 0,
      paddingBottom: 900 / 16 + '%',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#eee',
      iframe: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        border: 0
      }
    }}
  />
)

const YouTube = props => {
  return (
    <Wrapper>
      {props.videoId ? <Player {...props} /> : <pre>Enter a YouTube ID</pre>}
    </Wrapper>
  )
}

// mimicking Framer X - could make this compatible
YouTube.propertyControls = {
  isVoid: true,
  videoId: {
    type: 'string',
    title: 'Video ID',
    formatValue: n => (isURL(n) ? getYouTubeID(n) : n)
  }
}

export default YouTube
