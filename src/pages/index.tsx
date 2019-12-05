import React, { Component } from "react"
import { connect } from "react-redux"
import * as initActions from "redux/actions/initActions"
import Link from "next/link"

import Header from "partials/header"

type HomeType = {
  init: any
  initialize: any
}

class Home extends Component<{init, initialize}, HomeType> {
  componentDidMount() {
    console.log(this.props.init)
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

// const Home = (props: HomeProps) => {
//   return (
//     <div>
//       <Header />
//       {props.initialize.helloWorld ? "Next Storefront intialized" : ":("}
//     </div>
//   )
// }

export default connect((state) => state, { ...initActions })(Home)
