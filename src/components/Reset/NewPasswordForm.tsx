import React, { Component, MouseEvent, ChangeEvent, FormEvent } from "react"
import { connect } from "react-redux"
import { client } from "../../lib/apollo"
import { NEW_PASSWORD } from "../../gql"

interface Session {
  userEmail: boolean
}
interface NewProps {
  session: Session
}
interface NewState {
  verifyCode: string
  password: string
  passwordConf: string
  errors: object
}
class NewForm extends Component<NewProps, NewState> {
  state = {
    verifyCode: "",
    password: "",
    passwordConf: "",
    errors: {},
  }

  handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { password, verifyCode } = this.state
    const { userEmail } = this.props.session
    try {
      const result = await client.mutate({
        mutation: NEW_PASSWORD,
        variables: { code: verifyCode, email: userEmail, pw: password },
      })
    } catch(err) {
      //handle error
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState((prevState) => ({ ...prevState, [name]: value }))
  }

  render() {
    return (
      <form onSubmit={this.handleReset} id="newForm" className="form">
        <div className="form--item">
          <label>Verification Code</label>
          <input
            id="newInputVerifyCode"
            onChange={this.handleInputChange}
            name="verifyCode"
            type="text"
          />
        </div>
        <div className="form--item">
          <label>New Password</label>
          <input
            id="newInputPassword"
            onChange={this.handleInputChange}
            name="password"
            type="password"
          />
        </div>
        <p>
          Your password must be at least: 8 characters long Contain at least 1
          number Contain uppercase letters Contain lowercase letters
        </p>
        <div className="form--item">
          <label>Confirm New Password</label>
          <input
            id="newInputPasswordConf"
            onChange={this.handleInputChange}
            name="passwordConf"
            type="password"
          />
        </div>
        <div>
          <button id="newPasswordButton" type="submit">
            SUBMIT NEW PASSWORD
          </button>
        </div>
      </form>
    )
  }
}

export default connect((state) => state)(NewForm)
