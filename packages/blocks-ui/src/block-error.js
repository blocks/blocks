/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

export default ({ name, message }) => (
  <div
    sx={{
      p: 2
    }}
  >
    <span
      sx={{
        fontSize: 2
      }}
    >
      Failed to compile {name}
    </span>

    <Styled.pre
      sx={{
        mb: 0,
        backgroundColor: 'rgba(206, 17, 38, 0.05)',
        fontSize: '8pt'
      }}
    >
      {message}
    </Styled.pre>
  </div>
)
