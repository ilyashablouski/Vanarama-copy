import React, { Component, MouseEvent } from "react"
import { connect } from "react-redux"
import { gql } from "apollo-boost"
import { client } from "../../lib/apollo"

interface RegisterState {
  successful: boolean
}
class RegisterForm extends Component<{}, RegisterState> {
  state = {
    successful: false,
  }

  async registerHandler(e: MouseEvent<HTMLButtonElement>) {
    const result = await client.query({
      query: gql``,
    })
    console.log(result)
  }

  render() {
    return (
      <form id="register" className="form">
        <div className="form--item">
          <label>Email Address</label>
          <input type="text" />
        </div>
        <div className="form--item">
          <label>Password</label>
          <input type="text" />
        </div>
        <div className="form--item">
          <label>Password Confirmation</label>
          <input type="text" />
        </div>
        <div>
          //replace with lib cmpnt
          <button onClick={(e) => this.registerHandler(e)}>Submit</button>
        </div>
      </form>
    )
  }
}

export default RegisterForm
