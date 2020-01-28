import React, { Component } from "react"
import { connect } from "react-redux"
import * as initActions from "redux/actions/init_actions"

import Header from "../../partials/header"

interface HomeProps {
  init: (bool: boolean) => boolean
}

export class Home extends Component<HomeProps> {
  componentDidMount() {
    this.props.init(true)
  }
  render() {
    return (
      <div>
        <div className="init">
          <Header />
        </div>
        <div>
          <h1>Online Application Form</h1>
          <button>Launch Olaf Journey</button>
        </div>
      </div>
    )
  }
}

export default connect((state) => state, { ...initActions })(Home)
