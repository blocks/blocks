/** @jsx jsx */
import { jsx } from '@emotion/core'
import { css } from 'theme-ui'

export default ({ active, ...props }) => (
  <button
    {...props}
    css={css({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 32,
      height: 32,
      padding: 1,
      fontSize: 16,
      lineHeight: 1.5,
      margin: '1px',
      color: active ? 'primary' : 'inherit',
      backgroundColor: active ? 'lightgray' : 'transparent',
      border: 0,
      '&:focus': {
        outline: '2px solid',
        color: 'primary'
      }
    })}
  />
)
