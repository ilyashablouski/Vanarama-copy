import React, { Component, StyleHTMLAttributes } from "react"
import { connect } from "react-redux"
import * as initActions from "redux/actions/init_actions"
import Link from "next/link"


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
          <h1>Verify Your Identity</h1>
          <button>VERIFY YOUR IDENTITY</button>
        </div>
        <br></br>
        <div>
          <h2>Complete Your Application</h2>
          <Link href="./olaf_start">
            <a className="button-link">Complete Application </a>
          </Link>
        </div>
      </div>
    )
  }
}


export default connect((state) => state, { ...initActions })(Home)
