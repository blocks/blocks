/** @jsx jsx */
import { jsx } from '@emotion/core'
import { css } from 'theme-ui'
import { Box } from 'theme-ui/layout'

export default props => (
  <Box
    as="label"
    {...props}
    css={css({
      display: 'flex',
      flexDirection: 'column',
      fontWeight: 'bold',
      fontSize: 0
    })}
  />
)
