import React, { Component, MouseEvent, ChangeEvent, FormEvent } from "react"
import { client } from "../../lib/apollo"
import { REGISTER_USER } from "../../gql"

interface RegisterState {
  emailAddress: string
  password: string
  passwordConf: string
}
class RegisterForm extends Component<{}, RegisterState> {
  state: RegisterState = {
    emailAddress: "",
    password: "",
    passwordConf: "",
  }

  handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(this.state)
    const { emailAddress, password } = this.state
    try {
      const result = await client.mutate({
        mutation: REGISTER_USER,
        variables: { email: emailAddress, pw: password },
      })
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget
    if (Object.keys(this.state).includes(name)) {
      this.setState((prevState) => ({ ...prevState, [name]: value }))
    }
  }

  render() {
    return (
      <form onSubmit={this.handleRegister} id="register" className="form">
        <div className="form--item">
          <label>Email Address</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="emailAddress"
            type="email"
            value={this.state.emailAddress}
          />
        </div>
        <div className="form--item">
          <label>Password</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="password"
            type="password"
            value={this.state.password}
          />
        </div>
        <div className="form--item">
          <label>Password Confirmation</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="passwordConf"
            type="password"
            value={this.state.passwordConf}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

export default RegisterForm
