/** @jsx jsx */
import { jsx } from '@emotion/core'
import { css } from 'theme-ui'

export default props => (
  <button
    {...props}
    css={css({
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'bold',
      m: 0,
      px: 3,
      py: 2,
      color: 'background',
      bg: 'primary',
      border: '1px solid transparent',
      borderRadius: 4
    })}
  />
)
