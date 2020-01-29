import React, { Component } from "react"
import { connect } from "react-redux"
import * as initActions from "../redux/actions/init_actions"

import Header from "../partials/header"

interface Initialize{
  helloWorld: boolean
}

interface HomeProps {
  init: (bool: boolean) => boolean
  initialize: Initialize
}

export class Home extends Component<HomeProps> {
  componentDidMount() {
    this.props.init(true)
  }
  render() {
    return (
      <div className="init">
        <Header />
        <p>{this.props.initialize.helloWorld ? "Next Storefront initialized" : ":("}</p>
      </div>
    )
  }
}

export default connect((state) => state, { ...initActions })(Home)
