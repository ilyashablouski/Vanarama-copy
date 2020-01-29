import React, { Component } from "react"
import { NewPasswordForm } from "../components/Reset"

interface NewPage {}
class New extends Component<{}, NewPage> {
  render() {
    return (
      <div className="container">
        <h1 className="heading__title">Set New Password</h1>
        <NewPasswordForm />
      </div>
    )
  }
}

export default New
