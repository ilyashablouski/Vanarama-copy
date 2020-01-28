import React, { Component, MouseEvent, ChangeEvent, FormEvent } from "react"
import { Formik } from "formik"
import { client } from "../../lib/apollo"
import { NEW_PASSWORD } from "../../gql"

interface Reset {}

interface New {
  password: string
  passwordConf: string
  errors: object
}

class NewForm extends Component<{}, New> {
  state = {
    password: "",
    passwordConf: "",
    errors: {},
  }

  handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { password } = this.state
    const result = await client.mutate({
      mutation: NEW_PASSWORD,
      variables: { pw: password },
    })
    console.log(result)
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState((prevState) => ({ ...prevState, [name]: value }))
  }

  render() {
    return (
      <form onSubmit={this.handleReset} id="form-newPassword" className="form">
        <div className="form--item">
          <label>New Password</label>
          <input
            id="input-password"
            onChange={this.handleInputChange}
            name="password"
            type="email"
          />
        </div>
        <p>
          Your password must be at least: 
           8 characters long Contain at least 
           1 number 
           Contain uppercase letters 
           Contain lowercase letters
        </p>
        <div className="form--item">
          <label>Confirm New Password</label>
          <input
            id="input-passwordConf"
            onChange={this.handleInputChange}
            name="password"
            type="email"
          />
        </div>
        <div>
          <button type="submit">SUBMIT NEW PASSWORD</button>
        </div>
      </form>
    )
  }
}

export default NewForm
