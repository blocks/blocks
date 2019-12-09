/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from '@theme-ui/components'
import { ControlType, applyPropertyControls } from 'property-controls'

const FooterBasic = ({ justifyContent = 'space-between', ...props }) => {
  return (
    <footer
      sx={{
        variant: 'styles.footer',
        display: 'flex',
        alignItems: 'center',
        justifyContent
      }}
      {...props}
    />
  )
}

FooterBasic.Logo = props => {
  return (
    <Link
      sx={{
        variant: 'styles.navLink',
        p: 2,
        mr: 3
      }}
      {...props}
    />
  )
}
FooterBasic.Nav = props => {
  return <nav {...props} />
}
FooterBasic.Link = props => {
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
FooterBasic.Copyright = props => {
  return <p sx={{ m: 0 }} {...props} />
}

applyPropertyControls(FooterBasic, {
  justifyContent: {
    type: ControlType.Enum,
    defaultValue: 'right',
    options: ['space-between', 'start', 'space-evenly']
  },
  sx: {
    type: ControlType.Style
  }
})

applyPropertyControls(FooterBasic.Nav, {
  sx: {
    type: ControlType.Style
  }
})
applyPropertyControls(FooterBasic.Copyright, {
  children: {
    title: 'Text',
    type: ControlType.String
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

applyPropertyControls(FooterBasic.Logo, linkControls)
applyPropertyControls(FooterBasic.Link, linkControls)

FooterBasic.usage = `
  <FooterBasic>
    <FooterBasic.Nav>
      <FooterBasic.Logo to="/">Hello</FooterBasic.Logo>
      <FooterBasic.Link to="/about">About</FooterBasic.Link>
      <FooterBasic.Link to="/blog">Blog</FooterBasic.Link>
      <FooterBasic.Link to="/contact">Contact</FooterBasic.Link>
    </FooterBasic.Nav>
    <FooterBasic.Copyright>
      © 2048 Blocks UI
    </FooterBasic.Copyright>
  </FooterBasic>
`

export default FooterBasic
