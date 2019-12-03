import React from "react"
import { connect } from "react-redux"
import * as initActions from '../redux/actions/initActions'
import Link from "next/link"

import Header from "./shared/header"

type HomeProps = {
  init: object,
  helloWorld: boolean
}

const Home = (props: HomeProps) => (
  <div>
    <Header />
    {(props.helloWorld)? "Next Storefront intialized" : ":("}
  </div>
)


export default connect((state) => state, {...initActions})(Home)
