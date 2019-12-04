/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Container } from '@theme-ui/components'
import { Link } from 'gatsby'
import SEO from './seo'

export default ({ children, _frontmatter: { title } = {} }) => (
  <Styled.root>
    <SEO title={title} />
    <Container as="main" mb={[3, 4, 5]}>
      <Link to="/">
        <img
          src="https://user-images.githubusercontent.com/1424573/61592179-e0fda080-ab8c-11e9-9109-166cc7c86b43.png"
          alt="blocks logo"
          width="80"
          style={{
            marginTop: 128,
            marginLeft: -5,
            marginBottom: 8
          }}
        />
      </Link>
      {children}
    </Container>
  </Styled.root>
)
