import { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-grid-system';
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

  static async getInitialProps(ctx): Promise<Object> {
    const { aboutYou } = ctx.store.getState().olaf;
    try {
      const allDropDowns = await allDropdownData();
      return { allDropDowns, preloadData: aboutYou };
    } catch (e) {
      console.log(e);
    }
  }

  //>>> may move into redux investigating apollo cache as an alternative for this scenario <<<
  createDetailsHandle = async (details: IDetails) => {
    try {
      const { data } = await createUpdatePerson(details);
      this.setState({ failedMutation: false }, () => {
        this.props.captchaOlafData('aboutYou', data.createUpdatePerson);
      });
    } catch {
      this.setState({ failedMutation: true });
    }
  };

  render() {
    return (
      <OlafContainer activeStep={1}>
        <AboutForm
          submit={this.createDetailsHandle}
          allDropDowns={this.props.allDropDowns}
          preloadData={this.props.preloadData}
        />
      </OlafContainer>
    );
  }
}

export default connect(null, {
  captchaOlafData,
})(AboutYou);
