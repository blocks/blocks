/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from '@theme-ui/components'
import { ControlType, applyPropertyControls } from 'property-controls'

const HeaderLogo = ({ justifyContent = 'space-between', ...props }) => {
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

HeaderLogo.Logo = ({ to, ...props }) => {
  return (
    <Link
      sx={{
        variant: 'styles.navLink',
        p: 2
      }}
      to={to}
      {...props}
    >
      <img
        alt="Logo"
        src="https://contrast.now.sh/white/black?size=48&fontSize=2&baseline=2&fontWeight=900&radius=32&text=UI"
        sx={{
          verticalAlign: 'middle'
        }}
        {...props}
      />
      <span
        sx={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          top: -9999
        }}
      >
        Home
      </span>
    </Link>
  )
}
HeaderLogo.Nav = props => {
  return <nav {...props} />
}
HeaderLogo.Link = props => {
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

applyPropertyControls(HeaderLogo, {
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

applyPropertyControls(HeaderLogo.Logo, linkControls)
applyPropertyControls(HeaderLogo.Link, linkControls)

HeaderLogo.usage = `
  <HeaderLogo>
    <HeaderLogo.Logo to="/" />
    <HeaderLogo.Nav>
      <HeaderLogo.Link to="/about">About</HeaderLogo.Link>
      <HeaderLogo.Link to="/blog">Blog</HeaderLogo.Link>
      <HeaderLogo.Link to="/contact">Contact</HeaderLogo.Link>
    </HeaderLogo.Nav>
  </HeaderLogo>
`

export default HeaderLogo
