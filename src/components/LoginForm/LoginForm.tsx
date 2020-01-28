import React, { Component, MouseEvent, ChangeEvent, FormEvent } from "react"
import { connect } from "react-redux"
import { client } from "../../lib/apollo"
import { LOGIN_USER } from "../../gql"
import * as sessionActions from "../../redux/actions/session_actions"

interface Session {
  isAuthenticated: boolean,
  currentSessionData: any
}
interface LoginProps {
  session: Session,
  updateSession: (isAuthenticated: boolean, currentSessionData: any) => boolean
}
interface LoginState {
  emailAddress: string
  password: string
  token: string
}

class LoginForm extends Component<LoginProps, LoginState> {
  state: LoginState = {
    password: "",
    emailAddress: "",
    token: ""
  }

  handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { emailAddress, password } = this.state
    try {
      const result = await client.mutate({
        mutation: LOGIN_USER,
        variables: { email: emailAddress, pw: password },
      })
      this.setState({token: result.data.login}, () => {
        console.log(this.state.token)
        this.props.updateSession(true, {})
      })
    } catch(err) {
      console.log("login failed:", err )
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState((prevState) => ({ ...prevState, [name]: value }))
  }

  render() {
    return (
      <form onSubmit={this.handleLogin} id="login" className="form">
        <div className="form--item">
          <label>Email Address</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="emailAddress"
            type="email"
            id="input-email"
          />
        </div>
        <div className="form--item">
          <label>Password</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="password"
            type="password"
            id="input-password"
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

export default connect((state) => state, { ...sessionActions })(LoginForm)
