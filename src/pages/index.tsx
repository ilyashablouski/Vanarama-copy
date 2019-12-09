import React, { Component } from "react"
import { connect } from "react-redux"
import * as initActions from "../redux/actions/initActions"

import Header from "../partials/header"

interface Initalize{
  helloWorld: boolean
}

interface HomeProps {
  init: (bool: boolean) => boolean
  initialize: Initalize
}

export class Home extends Component<HomeProps> {
  componentDidMount() {
    this.props.init(true)
  }
  render() {
    return (
      <div>
        <Header />
        {this.props.initialize.helloWorld ? "Next Storefront intialized" : ":("}
      </div>
    )
  }
}

export default connect((state) => state, { ...initActions })(Home)
