import React, { Component } from "react"

type LoginState = {}

class LoginForm extends Component<{}, LoginState> {
    state ={

    }

    render(){
        return(<form id="login" className="form"></form>);
    }
}

export default LoginForm
