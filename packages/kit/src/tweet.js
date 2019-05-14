/** @jsx jsx */
import { jsx } from '@emotion/core'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import isURL from 'is-url'
import parse from 'url-parse'

const Tweet = props => (
  <div>
    {props.tweetId ? (
      <TwitterTweetEmbed
        {...props}
        options={{
          width: '100%'
        }}
      />
    ) : (
      <pre>Enter a Tweet ID</pre>
    )}
  </div>
)

const getIDFromURL = url => {
  const { pathname } = parse(url)
  const paths = pathname.split('/')
  const id = paths[paths.length - 1]
  return id
}

Tweet.propertyControls = {
  isVoid: true,
  tweetId: {
    type: 'string',
    title: 'Tweet ID',
    formatValue: n => (isURL(n) ? getIDFromURL(n) : n)
  }
}

export default Tweet
