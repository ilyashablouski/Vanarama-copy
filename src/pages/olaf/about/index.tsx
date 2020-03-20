/* eslint-disable react/no-unused-state */
import { Component } from 'react';
import { connect } from 'react-redux';
import { NextPageContext } from 'next';
import { captchaOlafData } from '../../../services/redux/olaf/actions';
import {
  allDropdownData,
  createUpdatePerson,
} from '../../../services/apollo/olaf/api';

import OlafContainer from '../../../components/olaf/olaf-container';
import AboutForm from '../../../components/olaf/about-form';

import { IDetails } from '../../../components/olaf/about-form/interface';
import { IAboutProps } from './interface';

export class AboutYou extends Component<IAboutProps> {
  state = {
    failedMutation: false,
  };

  static async getInitialProps(ctx: NextPageContext): Promise<Object> {
    const { aboutYou } = ctx.store.getState().olaf;
    try {
      const allDropDowns = await allDropdownData();
      return { allDropDowns, preloadData: aboutYou };
    } catch {
      return { failedQuery: true };
    }
  }

  // >>> may move into redux investigating apollo cache as an alternative for this scenario <<<
  createDetailsHandle = async (details: IDetails) => {
    const { captchaOlafData: captcha } = this.props;
    try {
      const { data } = await createUpdatePerson(details);
      this.setState({ failedMutation: false }, () => {
        captcha('aboutYou', data.createUpdatePerson);
      });
    } catch {
      this.setState({ failedMutation: true });
    }
  };

  render() {
    const { allDropDowns, preloadData } = this.props;
    return (
      <OlafContainer activeStep={1}>
        <AboutForm
          submit={this.createDetailsHandle}
          allDropDowns={allDropDowns}
          preloadData={preloadData}
        />
      </OlafContainer>
    );
  }
}

export default connect(null, {
  captchaOlafData,
})(AboutYou);
