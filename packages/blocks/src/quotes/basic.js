/** @jsx jsx */
import { jsx } from 'theme-ui'
import { ControlType, applyPropertyControls } from 'property-controls'

const QuoteBasic = ({ textAlign = 'center', ...props }) => (
  <section
    sx={{
      px: 2,
      py: [3, 4, 5],
      textAlign
    }}
    {...props}
  />
)

QuoteBasic.Content = props => (
  <blockquote
    sx={{
      maxWidth: 'container',
      mx: 'auto',
      my: 0,
      fontSize: [3, 4, 6],
      lineHeight: 'heading',
      fontWeight: 'heading'
    }}
    {...props}
  />
)

QuoteBasic.Author = ({ children, ...props }) =>
  children ? (
    <footer
      sx={{
        fontSize: 1
      }}
      {...props}
    >
      &mdash; {children}
    </footer>
  ) : null

applyPropertyControls(QuoteBasic, {
  textAlign: {
    type: ControlType.Enum,
    options: ['left', 'center', 'right']
  },
  sx: {
    type: ControlType.Style
  }
})

applyPropertyControls(QuoteBasic.Content, {
  children: {
    title: 'Text',
    type: ControlType.String
  },
  sx: {
    type: ControlType.Style
  }
})

applyPropertyControls(QuoteBasic.Author, {
  children: {
    title: 'Text',
    type: ControlType.String,
    required: true
  },
  sx: {
    type: ControlType.Style
  }
})

QuoteBasic.usage = `
  <QuoteBasic>
    <QuoteBasic.Content>
      We have to continually be jumping off cliffs and developing
      our wings on the way down.
    </QuoteBasic.Content>
    <QuoteBasic.Author>
      Kurt Vonnegut
    </QuoteBasic.Author>
  </QuoteBasic>
`

export default QuoteBasic
