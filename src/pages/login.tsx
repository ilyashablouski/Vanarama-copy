import React, { Component } from "react"
import RegisterForm from "../components/RegisterForm"
import LoginForm from "../components/LoginForm"

type LoginState = {}
class LoginPage extends Component<{}, LoginState> {
  render() {
    return (
      <div className="container">
        <h1 className="title h1">Login or Register</h1>
        <section>
          <button>Login</button>
          <button>Register</button>
          <div id="loginTab">
          </div>
          <div id="registerTab">
            <RegisterForm />
          </div>
        </section>
      </div>
    )
  }
}

export default LoginPage
