import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = msg => {
    this.setState({showErrorMsg: true, errorMsg: msg})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginApi = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApi, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onUserNameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showErrorMsg, errorMsg} = this.state
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/ssrikanth/image/upload/v1686326572/InstaShare/Layer_2_cg43ns.png"
          alt="website login"
          className="login-landing-image"
        />

        <form className="login-form-container" onSubmit={this.onSubmitLogin}>
          <div className="login-app-logo-container">
            <img
              src="https://res.cloudinary.com/ssrikanth/image/upload/v1686326557/InstaShare/Standard_Collection_8_z37oql.png"
              alt="website logo"
              className="login-app-logo"
            />
            <h1 className="website-logo-heading">Insta Share</h1>
          </div>
          <div className="input-container">
            <label htmlFor="username" className="login-input-label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="username is rahul"
              onChange={this.onUserNameChange}
              className="login-input-element"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="login-input-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="password is rahul@2021"
              onChange={this.onPasswordChange}
              className="login-input-element"
            />
          </div>
          {showErrorMsg && <p className="login-error-msg">{errorMsg}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
