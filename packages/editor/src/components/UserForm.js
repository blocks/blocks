import React, { Component } from 'react'

import { setToken } from '../lib/auth'
import { baseUrl, redirect } from '../lib/util'

class UserForm extends Component {
  state = { email: '', password: '', errors: {} }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = async e => {
    const { path } = this.props
    const { email, password } = this.state
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { email, password } })
    })

    const { token, ...user } = await response.json()

    if (response.status === 401) {
      this.setState({ errors: { base: 'Bad email or password' } })
    } else if (response.status !== 200) {
      this.setState({ errors: { base: 'Uh-oh' } })
    } else if (user.errors) {
      this.setState({ errors: user.errors })
    } else {
      setToken(token)
      redirect('/')
    }
  }

  render = () =>
    this.props.children({
      emailProps: {
        name: 'email',
        type: 'email',
        value: this.state.email,
        onChange: this.handleChange
      },
      passwordProps: {
        name: 'password',
        type: 'password',
        value: this.state.password,
        onChange: this.handleChange
      },
      submitProps: {
        type: 'submit',
        onClick: this.handleSubmit
      },
      errors: this.state.errors
    })
}

export default UserForm
