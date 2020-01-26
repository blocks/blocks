/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Grid } from '@theme-ui/components'

export const PanelGroup = ({ children, title, ...props }) => (
  <section
    {...props}
    sx={{ p: 3, borderBottom: '1px solid', borderColor: 'border' }}
  >
    <h3
      sx={{
        fontSize: 0,
        fontWeight: 500,
        lineHeight: 1,
        letterSpacing: 3,
        mt: 0,
        mb: 3,
        textTransform: 'uppercase'
      }}
    >
      {title}
    </h3>
    <Grid gap={2} columns={1}>
      {children}
    </Grid>
  </section>
)
