import React, { Component, MouseEvent, ChangeEvent, FormEvent } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { client } from "../../lib/apollo"
import { REGISTER_USER } from "../../gql"

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
      <form onSubmit={this.handleRegister} id="register" className="form">
        <div className="form--item">
          <label>Email Address</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="email"
            type="email"
            value={this.state.email}
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

class RegisterFormV2 extends Component<{}, RegisterState> {
  handleRegister = async (values, setSubmitting) => {
    const { email, password } = values
    try {
      const result = await client.mutate({
        mutation: REGISTER_USER,
        variables: { email: email, pw: password },
      })
      setSubmitting(false)
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <Formik
        validate={(values) => {
          const errors = {}
          return errors
        }}
        initialValues={{ email: "", password: "", passwordConf: "" }}
        onSubmit={(values, { setSubmitting }) => {
          this.handleRegister(values, setSubmitting)
        }}
      >
        {({ isSubmitting, handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit} id="register" className="form">
            <div className="form--item">
              <label>Email Address</label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                value={values.email}
              />
            </div>
            <div className="form--item">
              <label>Password</label>
              <input
                onChange={handleChange}
                name="password"
                type="password"
                value={values.password}
              />
            </div>
            <div className="form--item">
              <label>Password Confirmation</label>
              <input
                onChange={handleChange}
                name="passwordConf"
                type="password"
                value={values.passwordConf}
              />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    )
  }
}

export default RegisterFormV2
