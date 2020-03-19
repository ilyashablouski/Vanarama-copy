import { Component } from 'react';
import { connect } from 'react-redux';
import { captchaOlafData } from '../../services/redux/olaf/actions';
import {
  allDropdownData,
  createUpdatePerson,
} from '../../services/apollo/olaf/api';

import ProgressContainer from '../../components/olaf/progress-container';
import AboutForm from '../../components/olaf/about-form';

import { IDetails } from '../../components/olaf/about-form/interface';
interface IProps {
  allDropDowns: any;
  preloadData: any;
  captchaOlafData: (pageRef: string, data: {}) => void;
}
export class AboutYou extends Component<IProps> {
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
      <ProgressContainer activeStep={1}>
        <AboutForm
          submit={this.createDetailsHandle}
          allDropDowns={this.props.allDropDowns}
          preloadData={this.props.preloadData}
        />
      </ProgressContainer>
    );
  }
}

export default connect(null, {
  captchaOlafData,
})(AboutYou);
