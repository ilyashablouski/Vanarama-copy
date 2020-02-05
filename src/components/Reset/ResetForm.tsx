import React, { Component, ChangeEvent, FormEvent } from "react"
import { connect } from "react-redux"
import * as sessionActions from "../../redux/actions/session_actions"
import { client } from "../../lib/apollo"
import { RESET_REQUEST } from "../../gql"

interface ResetProps {
  captchaUserEmail: (email: string) => string
}
interface ResetState {
  emailAddress: string
  errors: object
}

class ResetForm extends Component<ResetProps, ResetState> {
  state = {
    emailAddress: "",
    errors: {},
  }

  handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { emailAddress } = this.state
    try {
      const result = await client.mutate({
        mutation: RESET_REQUEST,
        variables: { email: emailAddress },
      })
      console.log(result)
      this.props.captchaUserEmail(emailAddress)
    } catch {}
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState((prevState) => ({ ...prevState, [name]: value }))
  }

  render() {
    return (
      <form onSubmit={this.handleReset} id="resetForm" className="form">
        <div className="Field">
          <label className="Field__label">Email Address</label>
          <input
            className="Field__Native"
            onChange={this.handleInputChange}
            name="emailAddress"
            type="email"
            id="resetInputEmailAddress"
          />
        </div>
        <button id="resetButton" type="submit">
          SEND ME RESET PASSWORD
        </button>
      </form>
    )
  }
}

export default connect((state) => state, { ...sessionActions })(ResetForm)
