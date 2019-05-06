/** @jsx jsx */
import { jsx } from '@emotion/core'
import { css } from 'theme-ui'

export default props => (
  <input
    type="text"
    {...props}
    css={css({
      fontFamily: 'inherit',
      fontSize: 1,
      padding: 1,
      margin: 0,
      color: 'inherit',
      backgroundColor: 'white',
      border: '1px solid',
      borderColor: 'gray'
    })}
  />
)
