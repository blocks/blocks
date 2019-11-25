import React from 'react'
import ReactGist from 'react-gist'

const Gist = ({ id, ...props }) => {
  return (
    <div style={{ marginLeft: -8, marginRight: -8 }}>
      <ReactGist {...props} id={id} />
    </div>
  )
}

Gist.propertyControls = {
  isVoid: true,
  id: {
    type: 'string',
    title: 'Gist ID',
    description: 'GitHub Gist ID to be embedded'
  }
}

export default Gist
