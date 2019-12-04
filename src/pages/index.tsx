import React from "react"
import { connect } from "react-redux"
import * as initActions from "redux/actions/initActions"
import Link from "next/link"

import Header from "partials/header"

type HomeProps = {
  init: object
  initialize: any
}

const Home = (props: HomeProps) => {
  return (
    <div>
      <Header />
      {props.initialize.helloWorld ? "Next Storefront intialized" : ":("}
    </div>
  )
}

export default connect((state) => state, { ...initActions })(Home)
