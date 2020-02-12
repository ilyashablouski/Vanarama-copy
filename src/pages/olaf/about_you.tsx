import React, { Component, StyleHTMLAttributes } from 'react';
import { connect } from 'react-redux';
import * as olafActions from 'redux/actions/olaf_actions';
import Link from 'next/link';
import Header from '../../partials/header';

interface Props {
  captchaFormData: (pageRef: string, data: {}) => void;
}

export class AboutYou extends Component<Props> {

  render() {
    return (
      <div>
        <div className="init">
          <Header />
        </div>
        <div>
          <h1>Verify Your Identity</h1>
          <button id="olaf-verify-identity-button">VERIFY YOUR IDENTITY</button>
        </div>
        <div>
          <h2>Complete Your Application</h2>
          <Link href="./olaf_start">
            <a className="button-link" id="olaf-complete-application-link">
              Complete Application{' '}
            </a>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(state => state, { ...olafActions })(AboutYou);
