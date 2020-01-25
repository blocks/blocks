/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Label, Input, Button } from '@theme-ui/components'

const Subscribe = ({ formId = '1196750', skipDescription, skipTitle }) => (
  <div sx={{ mt: [3, 4, 5] }}>
    <form
      sx={{
        p: 4,
        pt: skipTitle ? 3 : 4,
        border: '2px solid',
        borderColor: 'text'
      }}
      action={`https://app.convertkit.com/forms/${formId}/subscriptions`}
      method="post"
    >
      {skipTitle ? null : (
        <h2
          sx={{
            m: 0,
            lineHeight: 1,
            pb: skipDescription ? 4 : null
          }}
        >
          Subscribe to the newsletter
        </h2>
      )}
      {skipDescription ? null : (
        <div>
          <Styled.p>
            If you want Blocks development news delivered to your inbox you can
            sign up for the newsletter. We’ll email you every month or so.
          </Styled.p>
          <Styled.p>
            <Styled.em>
              No spam, ever. You can unsubscribe at any time.
            </Styled.em>
          </Styled.p>
        </div>
      )}
      <Label htmlFor="first_name">Your first name</Label>
      <Input
        aria-label="Your first name"
        name="fields[first_name]"
        id="first_name"
        placeholder="First name"
        type="text"
      />
      <Label sx={{ mt: 2 }} htmlFor="email_address">
        Your email address
      </Label>
      <Input
        required
        aria-label="Your email address"
        name="email_address"
        id="email_address"
        placeholder="Email address"
        type="email"
      />
      <Button sx={{ mt: 3 }}>Join Now</Button>
    </form>
  </div>
)

export default Subscribe
