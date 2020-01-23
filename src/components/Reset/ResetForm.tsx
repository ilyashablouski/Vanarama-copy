import React, { Component, MouseEvent, ChangeEvent, FormEvent } from "react"
import { client } from "../../lib/apollo"
import { RESET_REQUEST } from "../../gql"

interface Reset {
  emailAddress: string,
  errors: object
}

class ResetForm extends Component<{}, Reset> {
  state = {
    emailAddress: "",
    errors: {}
  }

  handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <form onSubmit={this.handleReset} id="login" className="form">
        <div className="form--item">
          <label>Email Address</label>
          <input
            onChange={this.handleInputChange}
            name="emailAddress"
            type="email"
          />
        </div>
        <div>
          <button type="submit">SEND ME RESET PASSWORD</button>
        </div>
      </form>
    )
  }
}

export default ResetForm
