import React, { Component, MouseEvent, ChangeEvent, FormEvent } from "react"
import { client } from "../../lib/apollo"
import { REGISTER_USER } from "../../gql"
import Input from "../Input"

interface RegisterState {
  email: string
  password: string
  passwordConfirmation: string
}

class RegisterForm extends Component<{}, RegisterState> {
  state: RegisterState = {
    email: "",
    password: "",
    passwordConfirmation: "",
  }

  handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(this.state)
    const { email, password } = this.state
    try {
      const result = await client.mutate({
        mutation: REGISTER_USER,
        variables: { email: email, pw: password },
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
          <Input
            handleChange={this.handleInputChange}
            handleBlur={(e) => e}
            type={"email"}
            name={"email"}
            value={this.state.email}
            id={"input-email"}
          />
        </div>
        <div className="form--item">
          <label>Password</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="password"
            type="password"
            value={this.state.password}
            id="input-password"
          />
        </div>
        <div className="form--item">
          <label>Password Confirmation</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="passwordConfirmation"
            type="password"
            value={this.state.passwordConfirmation}
            id="input-password-confirmation"
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
