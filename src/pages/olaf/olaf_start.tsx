import React, { Component } from "react"
import { connect } from "react-redux"
import * as initActions from "../../redux/actions/initActions"

import Header from "../../partials/header"
import Button from "atomic/atoms/Button"
import Title from "atomic/atoms/Title"

interface Initalize {
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
        <div className="init">
          <Header />
          <p>
            {this.props.initialize.helloWorld
              ? "Next Storefront intialized"
              : ":("}
          </p>
        </div>
        <div>
          <Title title="Online Application Form" />
          <Button name="Launch Olaf Journey" />
        </div>
      </div>
    )
  }
}

export default connect((state) => state, { ...initActions })(Home)
