import { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import { captchaOlafData } from '../../services/redux/olaf/actions';
import {
  allDropdownData,
  createUpdatePerson,
} from '../../services/apollo/olaf/api';
import Heading from '@vanarama/uibook/src/components/atoms/heading';
import Text from '@vanarama/uibook/src/components/atoms/text';
import ProgressContainer from '../../components/olaf/progress-container';
import AboutForm from '../../components/olaf/about-form';
import { Grid, Column } from '../../components/grid';

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
        <Heading color="black" size="xlarge">
          About You
        </Heading>
        <Text color="darker" size="lead">
          We just need some initial details for your credit check.
        </Text>
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
