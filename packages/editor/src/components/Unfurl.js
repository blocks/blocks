import React, { Component } from 'react'

// TODO: Implement card
import { Flex, Link, Text, Box as Card, Image } from './ui'

const BASE_URL = 'https://unfurl.compositor.systems'

class Unfurl extends Component {
  state = { loading: true, error: false, data: null }

  async componentDidMount() {
    const { href } = this.props

    const res = await fetch(`${BASE_URL}?url=${href}`)

    if (res.ok) {
      const data = await res.json()
      this.setState({ data, loading: false })
    } else {
      this.setState({ error: true, loading: false })
    }
  }

  componentDidCatch(e) {
    this.setState({ error: true, errorMsg: e })
  }

  render() {
    const { href } = this.props
    const { data = {} } = this.state

    if (this.state.loading) {
      return <h1>Loading</h1>
    }

    if (this.state.error) {
      console.error(this.state.error)

      return <h1>Error</h1>
    }

    return (
      <Link color="black" href={href} css="text-decoration: none;">
        <Card borderRadius={8} p={4} boxShadow="0 0 16px rgba(0, 0, 0, .25)">
          <Flex alignItems="center">
            <Image mr={4} src={data.image} width={128} />
            <Card borderLeft="thin solid #fafafa">
              <Text fontWeight="bold">{data.title || href}</Text>
              {data.author || data.publisher ? (
                <Text>by {data.author || data.publisher}</Text>
              ) : null}
              {data.description ? (
                <Text color="gray">{data.description}</Text>
              ) : null}
            </Card>
          </Flex>
        </Card>
      </Link>
    )
  }
}

Unfurl.editableProps = [
  {
    name: 'href',
    type: 'url'
  }
]

export default Unfurl
