import React, { Component, StyleHTMLAttributes } from "react"
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
          <p>
            {this.props.initialize.helloWorld
              ? "Next Storefront intialized"
              : ":("}
          </p>
        </div>
        <div>
          <h1>Verify Your Identity</h1>
          <button>VERIFY YOUR IDENTITY</button>
        </div>
        <br></br>
        <div>
          <h2>Complete Your Application</h2>
          <a href="/olaf_start" className="button-link"> Complete Application </a>
        </div>
      </div>
    )
  }
}


export default connect((state) => state, { ...initActions })(Home)
