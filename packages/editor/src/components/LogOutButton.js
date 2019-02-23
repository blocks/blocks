import React, { Component } from 'react'

import { clearToken, getToken } from '../lib/auth'
import { baseUrl, redirect } from '../lib/util'

class LogOutButton extends Component {
  handleClick = async () => {
    const res = await fetch(`${baseUrl}/users/sign_out`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` }
    })

    if (res.status === 204) {
      clearToken()
      redirect('/login')
    } else {
      console.error('wat')
      // TODO: Error somehow if logout didn't work.
    }
  }

  render = () => <button onClick={this.handleClick}>Log Out</button>
}

export default LogOutButton
