import { Provider, Client } from 'urql'
import { getToken } from '../lib/auth'
import { baseUrl } from '../lib/util'

const client = new Client({
  url: `${baseUrl}/graphql`,
  fetchOptions: {
    headers: {
      'Content-Type': `application/json`,
      Authorization: `Bearer ${getToken()}`
    }
  }
})

export default props => (
  <Provider client={client}>
    <>
      <div {...props} />
    </>
  </Provider>
)
