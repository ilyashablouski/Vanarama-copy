import React, { Component } from "react"
import RegisterForm from "../components/RegistrationForm"
import LoginForm from "../components/LoginForm/LoginForm"
interface LoginState{}
class LoginPage extends Component<{}, LoginState> {
  render() {
    return (
      <div className="container">
        <h1 className="title h1">Login or Register</h1>
        <section>
          <button id="login">Login</button>
          <button id="register">Register</button>
          <div id="loginTab">
            <LoginForm />
          </div>
          <br/>
          <div id="registerTab">
            <RegisterForm />
          </div>
        </section>
      </div>
    )
  }
}

export default LoginPage
