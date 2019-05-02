/** @jsx jsx */
import { jsx } from '@emotion/core'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import Form from './Form'

// 1119307881709309952

const getProps = node => {
  const map = node.data.get('props')
  if (!map || typeof map.toJS !== 'function') return map
  return map.toJS()
}

export default ({ editor, node, attributes, props, isSelected }) => {
  return (
    <div>
      <div
        {...attributes}
        style={{
          outline: isSelected ? '2px solid blue' : null
        }}
      >
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
      {isSelected && (
        <Form
          value={props}
          onSubmit={next => {
            editor.setJSXProps(next)
          }}
        />
      )}
    </div>
  )
}
