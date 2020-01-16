import React, { Component } from "react"
import { withAuthenticator } from "aws-amplify-react"
import Amplify from "aws-amplify"

type LoginState = {
  isLoggedIn: boolean
}

class LoginPage extends Component<{}, LoginState> {
  state = {
    isLoggedIn: false,
  }
}

export default withAuthenticator(LoginPage)
