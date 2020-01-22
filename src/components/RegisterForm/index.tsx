import React, { Component, MouseEvent, ChangeEvent } from "react"
import { connect } from "react-redux"
import { gql } from "apollo-boost"
import { client } from "../../lib/apollo"

const ADD_USER = gql`
  mutation CreateRegisteredUser($email: String!, $pw: String!) {
    register(username: $email, password: $pw) 
  }
`
interface RegisterState {
  successful: boolean
  emailAddress: string
  password: string
  passwordConf: string
}
class RegisterForm extends Component<{}, RegisterState> {
  state: RegisterState = {
    successful: false,
    emailAddress: "",
    password: "",
    passwordConf: "",
  }

  handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(this.state)
    const { emailAddress, password } = this.state
    try {
      const result = await client.mutate({
        mutation: ADD_USER,
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
      <form id="register" className="form">
        <div className="form--item">
          <label>Email Address</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="emailAddress"
            type="email"
          />
        </div>
        <div className="form--item">
          <label>Password</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="password"
            type="password"
          />
        </div>
        <div className="form--item">
          <label>Password Confirmation</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="passwordConf"
            type="password"
          />
        </div>
        <div>
          <button onClick={(e) => this.handleRegister(e)}>Submit</button>
        </div>
      </form>
    )
  }
}

export default RegisterForm
