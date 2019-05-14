/** @jsx jsx */
import { jsx } from '@emotion/core'
import ReactGist from 'react-gist'

const Gist = props => {
  return (
    <div>
      {props.id ? (
        <div style={{ marginLeft: -8, marginRight: -8 }}>
          <ReactGist {...props} />
        </div>
      ) : (
        <pre>Enter a Gist ID</pre>
      )}
    </div>
  )
}

Gist.propertyControls = {
  isVoid: true,
  id: {
    type: 'string',
    title: 'Gist ID'
  }
}

export default Gist
