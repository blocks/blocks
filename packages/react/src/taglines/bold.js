/** @jsx jsx */
import { jsx } from 'theme-ui'
import { ControlType, applyPropertyControls } from 'property-controls'

const TaglineBold = props => (
  <section
    sx={{
      maxWidth: 'container',
      mx: 'auto',
      px: 2,
      py: [3, 4, 5]
    }}
    {...props}
  />
)

TaglineBold.Content = props => (
  <p
    sx={{
      m: 0,
      fontSize: [3, 4, 6],
      lineHeight: 'heading',
      fontWeight: 'heading',
      'span + span': {
        ml: 1
      }
    }}
    {...props}
  />
)

TaglineBold.Emphasis = props => (
  <span
    sx={{
      color: 'primary'
    }}
    {...props}
  />
)

TaglineBold.Normal = props => (
  <span
    sx={{
      color: 'text'
    }}
    {...props}
  />
)

applyPropertyControls(TaglineBold, {
  sx: {
    type: ControlType.Style
  }
})

applyPropertyControls(TaglineBold.Content, {
  as: {
    title: 'Element Type',
    type: ControlType.Enum,
    options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  },
  sx: {
    type: ControlType.Style
  }
})

applyPropertyControls(TaglineBold.Emphasis, {
  children: {
    title: 'Text',
    type: ControlType.String
  },
  sx: {
    type: ControlType.Style
  }
})

applyPropertyControls(TaglineBold.Normal, {
  children: {
    title: 'Text',
    type: ControlType.String,
    required: true
  },
  sx: {
    type: ControlType.Style
  }
})

TaglineBold.usage = `
  <TaglineBold>
    <TaglineBold.Content>
      <TaglineBold.Emphasis>
        Hello, world!
      </TaglineBold.Emphasis>
      <TaglineBold.Normal>
        A bold tagline is great for a section of text that needs to
        stand out from the rest of the page. It draws you in. It is
        extremely hard to ignore.
      </TaglineBold.Normal>
    </TaglineBold.Content>
  </TaglineBold>
`

export default TaglineBold
