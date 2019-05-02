/** @jsx jsx */
import { jsx } from '@emotion/core'
import { css } from 'theme-ui'

export default props => (
  <button
    {...props}
    css={css({
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 1,
      fontWeight: 'bold',
      m: 0,
      px: 2,
      py: 1,
      color: 'background',
      bg: 'primary',
      border: '1px solid transparent',
      borderRadius: 4,
      userSelect: 'none'
    })}
  />
)
