import React, { Component, MouseEvent, ChangeEvent } from "react"
import { connect } from "react-redux"
import { gql } from "apollo-boost"
import { client } from "../../lib/apollo"

interface Session {
  isAuthenticated: boolean
}
interface LoginProps {
  session: Session
}
interface LoginState {
  emailAddress: string
  password: string
}

const LOGIN_USER = gql`
  mutation CreateRegisteredUser($email: String!, $pw: String!) {
    login(username: $email, password: $pw)
  }
`

class LoginForm extends Component<LoginProps, LoginState> {
  state: LoginState = {
    password: "",
    emailAddress: "",
  }

  handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    const { emailAddress, password } = this.state
    const result = await client.mutate({
      mutation: LOGIN_USER,
      variables: { email: emailAddress, pw: password },
    })
    console.log(result)
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState((prevState) => ({ ...prevState, [name]: value }))
  }

  render() {
    return (
      <form id="login" className="form">
        <div className="form--item">
          <label>Email Address</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="emailAddress"
            type="email"
          />
        </div>
        <div className="form--item">
          <label>Password</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="password"
            type="password"
          />
        </div>
        <div>
          //replace with lib cmpnt
          <button onClick={(e) => this.handleLogin(e)}>Submit</button>
        </div>
      </form>
    )
  }
}

export default connect((state) => state)(LoginForm)
