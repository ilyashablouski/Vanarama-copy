import React, { Component, MouseEvent, ChangeEvent, FormEvent } from "react"
import { Formik } from "formik"
import { connect } from "react-redux"
import { client } from "../../lib/apollo"
import { LOGIN_USER } from "../../gql"

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

class LoginForm extends Component<LoginProps, LoginState> {
  state: LoginState = {
    password: "",
    emailAddress: "",
  }

  handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
      <form onSubmit={this.handleLogin} id="login" className="form">
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
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

/* class LoginFormV2 extends Component<LoginProps, LoginState> {
  handleLogin = async (values) => {
    const { emailAddress, password } = values
    const result = await client.mutate({
      mutation: LOGIN_USER,
      variables: { email: emailAddress, pw: password },
    })
    console.log(result)
  }
  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={this.handleLogin}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit} id="login" className="form">
            <div className="form--item">
              <label>Email Address</label>
              <input onChange={handleChange} name="emailAddress" type="email" />
            </div>
            <div className="form--item">
              <label>Password</label>
              <input onChange={handleChange} name="password" type="password" />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      </Formik>
    )
  }
} */

export default connect((state) => state)(LoginForm)
