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
  email: string
  password: string
}

class LoginForm extends Component<LoginProps, LoginState> {
  state: LoginState = {
    password: "",
    email: "",
  }

  handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    const result = await client.mutate({
      mutation: gql``,
    })
    console.log(result)
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({})
  }

  render() {
    return (
      <form id="login" className="form">
        <div className="form--item">
          <label>Email Address</label>
          <input type="text" />
        </div>
        <div className="form--item">
          <label>Password</label>
          <input type="text" />
        </div>
        <div>
          //replace with lib cmpnt
          <button onClick={(e) => this.loginHandler(e)}>Submit</button>
        </div>
      </form>
    )
  }
}

export default connect((state) => state)(LoginForm)
