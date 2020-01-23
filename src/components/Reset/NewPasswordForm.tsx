import React, { Component, MouseEvent, ChangeEvent, FormEvent } from "react"
import { Formik } from "formik"
import { client } from "../../lib/apollo"
import { NEW_PASSWORD } from "../../gql"

interface Reset {}

interface New {
    password: string,
    passwordConf: string,
    errors: object
  }
  
  class NewForm extends Component<{}, New> {
    state = {
      password: "",
      passwordConf: "",
      errors: {}
    }
  
    handleReset = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
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
        <form onSubmit={this.handleReset} id="login" className="form">
          <div className="form--item">
            <label>Password</label>
            <input
              onChange={this.handleInputChange}
              name="password"
              type="email"
            />
          </div>
          <div className="form--item">
            <label>Password Confirmation</label>
            <input
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
