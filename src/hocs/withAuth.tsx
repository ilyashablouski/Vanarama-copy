import React, { Component } from "react"

export const AuthHoc = (PassedComponent) => {
  class Auth extends Component {
    state = {}



    render() {
      return <PassedComponent />
    }
  }
}
