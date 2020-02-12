import React, { Component, ChangeEvent, FormEvent } from "react"
import { client } from "../../lib/apollo"
import { REGISTER_USER } from "../../gql"
import Input from "../Input"

interface RegisterState {
  email: string
  password: string
  passwordConf: string
}

class RegisterForm extends Component<{}, RegisterState> {
  state: RegisterState = {
    email: "",
    password: "",
    passwordConf: "",
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
      <form onSubmit={this.handleRegister} id="register-form" className="form">
        <div className="form--item">
          <label>Email Address</label>
          <Input
            handleChange={this.handleInputChange}
            handleBlur={(e) => e}
            type="email"
            name="email"
            value={this.state.email}
            id={"registerInputEmail"}
          />
        </div>
        <div className="form--item">
          <label>Password</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="password"
            type="password"
            value={this.state.password}
            id="registerInputPassword"
          />
        </div>
        <div className="form--item">
          <label>Password Confirmation</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="passwordConf"
            type="password"
            value={this.state.passwordConf}
            id="registerInputPasswordConf"
          />
        </div>
        <div>
          <button id="registerButton" type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

export default RegisterForm
