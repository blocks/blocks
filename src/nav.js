/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'

const activeStyle = { textDecoration: 'underline' }

const Nav = () => (
  <ul>
    <li>
      <Link to="/getting-started" activeStyle={activeStyle}>
        Getting started
      </Link>
    </li>
    <li>
      <Link to="/blocks" activeStyle={activeStyle}>
        Blocks library
      </Link>
    </li>
    <li>
      <Link to="/docs/controls" activeStyle={activeStyle}>
        Controls
      </Link>
    </li>
    <li>
      <Link to="/docs/guides" activeStyle={activeStyle}>
        Guides
      </Link>
      <ul>
        <li>
          <Link
            to="/docs/guides/write-a-custom-block"
            activeStyle={activeStyle}
          >
            Custom blocks
          </Link>
        </li>
      </ul>
    </li>
    <li>
      <Link to="/about" activeStyle={activeStyle}>
        About
      </Link>
    </li>
    <li>
      <Link to="/vision" activeStyle={activeStyle}>
        Vision
      </Link>
    </li>
    <li>
      <Link to="/docs/advanced" activeStyle={activeStyle}>
        Advanced
      </Link>
      <ul>
        <li>
          <Link to="/docs/advanced/how-it-works" activeStyle={activeStyle}>
            How it works
          </Link>
        </li>
        <li>
          <Link to="/docs/advanced/transforms" activeStyle={activeStyle}>
            Transforms
          </Link>
        </li>
        <li>
          <Link to="/docs/advanced/queries" activeStyle={activeStyle}>
            Queries
          </Link>
        </li>
        <li>
          <Link
            to="/docs/advanced/blocks-docs-generation"
            activeStyle={activeStyle}
          >
            Blocks docs generation
          </Link>
        </li>
      </ul>
    </li>
  </ul>
)

export default Nav
