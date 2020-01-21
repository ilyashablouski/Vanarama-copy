import React, { Component, MouseEvent } from "react"
import { connect } from "react-redux"
import { gql } from "apollo-boost"
import { client } from "../../lib/apollo"

interface Session {
  isAuthenticated: boolean
}
interface LoginState {
  session: Session
}

class LoginForm extends Component<{}, LoginState> {
  async loginHandler(e: MouseEvent<HTMLButtonElement>) {
    const result = await client.query({
      query: gql``,
    })
    console.log(result)
  }

  render() {
    return (
      <form id="login" className="form">
        <div className="form--item">
          <label>Email Address</label>
          <input type="text" />
        </div>
        <div className="form--item">
          <label>Password</label>
          <input type="text" />
        </div>
        <div>
          //replace with lib cmpnt
          <button onClick={(e) => this.loginHandler(e)}>Submit</button>
        </div>
      </form>
    )
  }
}

export default connect((state) => state)(LoginForm)
