/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Grid } from '@theme-ui/components'

import appTheme from './theme'

export const FieldGroup = ({ title, children, ...props }) => (
  <div
    sx={{
      p: 3,
      pb: 4,
      '&:not(:last-child)': {
        borderBottom: '1px solid',
        borderColor: appTheme.colors.border
      }
    }}
    {...props}
  >
    {title && (
      <h3
        sx={{
          fontSize: 0,
          fontWeight: 500,
          letterSpacing: 3,
          mt: 0,
          mb: 3,
          textTransform: 'uppercase'
        }}
      >
        {title}
      </h3>
    )}
    <Grid>{children}</Grid>
  </div>
)
