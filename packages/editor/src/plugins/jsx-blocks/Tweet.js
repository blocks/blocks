/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import isURL from 'is-url'

// 1119307881709309952

const Tweet = props => (
  <>
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
  </>
)

Tweet.propertyControls = {
  tweetId: {
    type: 'string',
    title: 'Tweet ID',
    formatValue: n => (isURL(n) ? n : n)
  }
}

export default Tweet
