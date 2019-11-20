/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from '@theme-ui/components'
import { ControlType, applyPropertyControls } from 'property-controls'

const HeaderBasic = ({ justifyContent = 'space-between', ...props }) => {
  return (
    <header
      sx={{
        variant: 'styles.header',
        display: 'flex',
        alignItems: 'center',
        justifyContent
      }}
      {...props}
    />
  )
}

HeaderBasic.Logo = props => {
  return (
    <Link
      sx={{
        variant: 'styles.navLink',
        p: 2
      }}
      {...props}
    />
  )
}
HeaderBasic.Nav = props => {
  return <nav {...props} />
}
HeaderBasic.Link = props => {
  return (
    <Link
      sx={{
        variant: 'styles.navLink',
        p: 2
      }}
      {...props}
    />
  )
}

applyPropertyControls(HeaderBasic, {
  justifyContent: {
    type: ControlType.Enum,
    defaultValue: 'right',
    options: ['space-between', 'start', 'space-evenly']
  },
  sx: {
    type: ControlType.Style
  }
})

const linkControls = {
  children: {
    title: 'Text',
    type: ControlType.String,
    required: true
  },
  to: {
    title: 'URL',
    type: ControlType.String,
    defaultValue: '#!',
    required: true
  },
  sx: {
    type: ControlType.Style
  }
}

applyPropertyControls(HeaderBasic.Logo, linkControls)
applyPropertyControls(HeaderBasic.Link, linkControls)

HeaderBasic.usage = `
  <HeaderBasic>
    <HeaderBasic.Logo to="/">Hello</HeaderBasic.Logo>
    <HeaderBasic.Nav>
      <HeaderBasic.Link to="/about">About</HeaderBasic.Link>
      <HeaderBasic.Link to="/blog">Blog</HeaderBasic.Link>
      <HeaderBasic.Link to="/contact">Contact</HeaderBasic.Link>
    </HeaderBasic.Nav>
  </HeaderBasic>
`

export default HeaderBasic
