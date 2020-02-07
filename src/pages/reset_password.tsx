import React, { Component } from "react"
import { ResetForm } from "../components/Reset"
import { NewPasswordForm } from "../components/Reset"

interface ResetPage {}
class ResetPage extends Component<{}, ResetPage> {
  render() {
    return (
      <div className="container">
        <section>
          <h1 className="heading__title">Reset Your Password</h1>
          <p>To reset your password please enter your email address below:</p>
          <ResetForm />
        </section>

        <section>
          <h1 className="heading__title">Set New Password</h1>
          <NewPasswordForm />
        </section>
      </div>
    )
  }
}

export default ResetPage
