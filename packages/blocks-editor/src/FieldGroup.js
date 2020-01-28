/** @jsx jsx */
import { jsx } from 'theme-ui'

export const FieldGroup = ({ title, children, ...props }) => (
  <div
    sx={{
      p: 3,
      borderBottom: '1px solid',
      borderColor: 'border'
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
          mb: 2,
          textTransform: 'uppercase'
        }}
      >
        {title}
      </h3>
    )}
    {children}
  </div>
)
