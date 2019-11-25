/** @jsx jsx */
import { jsx } from '@emotion/core'
import { css } from 'theme-ui'

export default props => (
  <pre
    {...props}
    css={css({
      bg: 'lightgray',
      p: 3,
      fontFamily: 'monospace'
    })}
  />
)
