import React, { Component } from "react";

import Layout from '../components/Layout';

import { connect } from "react-redux";
import * as initActions from "../redux/actions/init_actions";

import Tabs from '../components/Tabs/tabs';
import {Tab} from '../components/Tabs/tab';

import Header from "../partials/header";

interface Initialize{
  helloWorld: boolean
}

interface HomeProps {
  init: (bool: boolean) => boolean
  initialize: Initialize
}

export class Home extends Component<HomeProps> {
  render() {
    return (
      <Layout>
        <div className="init">
          <Header />
        </div>
      </Layout>
    )
  }
}

export default connect((state) => state, { ...initActions })(Home)
