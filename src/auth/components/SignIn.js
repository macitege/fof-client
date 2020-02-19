import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  handleChange = event => {
    event.preventDefault()
    const { name, value } = event.target
    if (value.includes('@') && name === 'email_or_username') {
      this.setState({ email: value, username: '' })
    } else if (name === 'password') {
      this.setState({ password: value })
    } else {
      this.setState({ username: value, email: '' })
    }
  }

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ username: '', email: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { password } = this.state

    return (
      <form className='auth-form' onSubmit={this.onSignIn}>
        <h3>Sign In</h3>
        <label htmlFor="email">Email or Username</label>
        <input
          required
          type="text"
          name="email_or_username"
          placeholder="Email or Username"
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
    )
  }
}

export default withRouter(SignIn)
