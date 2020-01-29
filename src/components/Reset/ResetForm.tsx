import React, { Component, MouseEvent, ChangeEvent, FormEvent } from "react"
import { client } from "../../lib/apollo"
import { RESET_REQUEST } from "../../gql"

interface Reset {
  emailAddress: string
  errors: object
}

class ResetForm extends Component<{}, Reset> {
  state = {
    emailAddress: "",
    errors: {},
  }

  handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { emailAddress } = this.state
    const result = await client.mutate({
      mutation: RESET_REQUEST,
      variables: { email: emailAddress },
    })
    console.log(result)
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState((prevState) => ({ ...prevState, [name]: value }))
  }

  render() {
    return (
      <form onSubmit={this.handleReset} id="reset-form" className="form">
        <div className="Field">
          <label className="Field__label">Email Address</label>
          <input
            className="Field__Native"
            onChange={this.handleInputChange}
            name="emailAddress"
            type="email"
            id="reset-email-input"
          />
        </div>
        <button id="reset-button" type="submit">SEND ME RESET PASSWORD</button>
      </form>
    )
  }
}

export default ResetForm
