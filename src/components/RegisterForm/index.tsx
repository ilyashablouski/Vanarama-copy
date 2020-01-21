import React, { Component, MouseEvent, ChangeEvent } from "react"
import { connect } from "react-redux"
import { gql } from "apollo-boost"
import { client } from "../../lib/apollo"

const ADD_USER = gql`
    mutation CreateRegisteredUser(){

    }
`
interface RegisterState {
  successful: boolean,
  emailAddress: string,
  password: string,
  passwordConf: string
}
class RegisterForm extends Component<{}, RegisterState> {
  state: RegisterState = {
    successful: false,
    emailAddress: "",
    password: "",
    passwordConf: ""
  }

  handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
    const result = await client.mutate({
      mutation: ADD_USER,
      variables: {},
    })
    console.log(result)
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <form id="register" className="form">
        <div className="form--item">
          <label>Email Address</label>
          <input onChange={(e) => this.handleInputChange(e)} name="email" type="text" />
        </div>
        <div className="form--item">
          <label>Password</label>
          <input onChange={(e) => this.handleInputChange(e)} name="password" type="text" />
        </div>
        <div className="form--item">
          <label>Password Confirmation</label>
          <input onChange={(e) => this.handleInputChange(e)} name="passwordConf" type="text" />
        </div>
        <div>
          //replace with lib cmpnt
          <button onClick={(e) => this.handleRegister(e)}>Submit</button>
        </div>
      </form>
    )
  }
}

export default RegisterForm
