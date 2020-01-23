import React, { Component } from "react"

import LoginForm from "../components/LoginForm"
interface ResetPage{}
class ResetPage extends Component<{}, ResetPage> {
  render() {
    return (
      <div className="container">
        <h1 className="title h1">Reset Password</h1>
        <section>
        <p>To reset your password please enter your email address below:</p>
        
        </section>
      </div>
    )
  }
}

export default ResetPage