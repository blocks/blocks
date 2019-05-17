/* @jsx jsx */
import { jsx } from '@emotion/core'
import Player from 'react-youtube'
import isURL from 'is-url'
import getYouTubeID from 'get-youtube-id'

const formatValue = n => (isURL(n) ? getYouTubeID(n) : n)

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

const YouTube = ({ videoId, ...props }) => {
  return (
    <Wrapper>
      <Player videoId={formatValue(videoId)} {...props} />
    </Wrapper>
  )
}

// mimicking Framer X - could make this compatible
YouTube.propertyControls = {
  isVoid: true,
  videoId: {
    type: 'string',
    title: 'Video ID',
    description: 'YouTube ID of the video',
    formatValue
  }
}

export default YouTube
