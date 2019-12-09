/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from '@theme-ui/components'
import { ControlType, applyPropertyControls } from 'property-controls'

const HeaderLogo2 = ({
  justifyContent = 'space-between',
  textAlign = 'center',
  ...props
}) => {
  return (
    <header
      sx={{
        variant: 'styles.header',
        pt: 3,
        pb: 4,
        justifyContent,
        textAlign
      }}
      {...props}
    />
  )
}

HeaderLogo2.Logo = ({ to, ...props }) => {
  return (
    <Link
      sx={{
        variant: 'styles.navLink'
      }}
      to={to}
      {...props}
    >
      <img
        alt="Logo"
        src="https://contrast.now.sh/white/black?size=48&fontSize=2&baseline=2&fontWeight=900&radius=32&text=UI"
        sx={{
          verticalAlign: 'middle',
          py: 3
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
HeaderLogo2.Nav = props => {
  return <nav {...props} />
}
HeaderLogo2.Link = props => {
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

applyPropertyControls(HeaderLogo2, {
  justifyContent: {
    type: ControlType.Enum,
    defaultValue: 'right',
    options: ['space-between', 'start', 'space-evenly']
  },
  textAlign: {
    type: ControlType.Enum,
    defaultValue: 'center',
    options: ['left', 'center', 'right']
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

applyPropertyControls(HeaderLogo2.Logo, linkControls)
applyPropertyControls(HeaderLogo2.Link, linkControls)

HeaderLogo2.usage = `
  <HeaderLogo2>
    <HeaderLogo2.Logo to="/" />
    <HeaderLogo2.Nav>
      <HeaderLogo2.Link to="/about">About</HeaderLogo2.Link>
      <HeaderLogo2.Link to="/blog">Blog</HeaderLogo2.Link>
      <HeaderLogo2.Link to="/contact">Contact</HeaderLogo2.Link>
    </HeaderLogo2.Nav>
  </HeaderLogo2>
`

export default HeaderLogo2
