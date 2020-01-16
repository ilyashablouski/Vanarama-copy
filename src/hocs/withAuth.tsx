import React, { Component } from "react"

interface withAuthProps{
  userAuthenticated: boolean
}

export const withAuth = <P extends object>(PassedComponent: React.ComponentType) => {
  class Auth extends Component<P & withAuthProps> {
    componentDidMount(){

    }

    render() {
      return <PassedComponent />
    }
  }
}
