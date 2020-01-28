import React, { Component } from "react"
import { connect } from "react-redux"
import * as initActions from "../../redux/actions/initActions"
import Link from "next/link"

import Header from "../../partials/header"
import Button from "atomic/atoms/Button"
import Title from "atomic/atoms/Title"
import ButtonLink from "atomic/atoms/ButtonLink"

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
          <Title title="Verify Your Identity" />
          <Button name="VERIFY YOUR IDENTITY" />
        </div>
        <br></br>
        <div>
          <Title title="Complete Your Application" />
          <Link href={"/olaf/olaf_start"}>
            <ButtonLink href="/olaf/olaf_start" name="COMPLETE APPLICATION" />
          </Link>
        </div>
      </div>
    )
  }
}

export default connect((state) => state, { ...initActions })(Home)
