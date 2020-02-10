import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as initActions from '../redux/actions/init_actions';

import Tabs from '../components/Tabs/tabs';
import { Tab } from '../components/Tabs/tab';

import Header from '../partials/header';

interface Initialize {
  helloWorld: boolean;
}

interface HomeProps {
  init: (bool: boolean) => boolean;
  initialize: Initialize;
}

export class Home extends Component<HomeProps> {
  componentDidMount() {
    this.props.init(true);
  }
  render() {
    return (
      <div className="init">
        <Header />
        <p>
          {this.props.initialize.helloWorld
            ? 'Next Storefront initialized'
            : ':('}
        </p>

        <Tabs defaultActiveTabIndex={0}>
          <Tab tabTitle="Login">
            <div className="Tab__Content" id="tab-content-login">
              This is content for Tab 1
            </div>
          </Tab>

          <Tab tabTitle="Register">
            <div className="Tab__Content" id="tab-content-register">
              This is content for Tab 2
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default connect((state) => state, { ...initActions })(Home);
