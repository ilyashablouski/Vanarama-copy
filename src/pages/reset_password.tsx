import React, { Component } from "react"
import { ResetForm } from "../components/Reset"

interface ResetPage{}
class ResetPage extends Component<{}, ResetPage> {
  render() {
    return (
      <div className="container">
        <h1 className="heading__title">Reset Your Password</h1>
        <section>
        <p>To reset your password please enter your email address below:</p>
        <ResetForm />
        </section>
      </div>
    )
  }
}

export default ResetPage