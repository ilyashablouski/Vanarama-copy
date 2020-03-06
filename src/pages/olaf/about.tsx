import { Component } from 'react';
import { connect } from 'react-redux';
import { captchaOlafData } from '../../services/redux/olaf/actions';
import {
  allDropdownData,
  createUpdatePerson,
} from '../../services/apollo/olaf/api';
import AboutForm from '../../components/olaf/about-form';
import { IDetails } from '../../components/olaf/about-form/interface';
import { Row, Col } from 'react-grid-system';

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
      <Row>
        <Col sm={6}>
          <h1>About You</h1>
          <h3 className="Heading__Caption">
            We just need some initial details for your credit check.
          </h3>
          <AboutForm
            submit={this.createDetailsHandle}
            allDropDowns={this.props.allDropDowns}
            preloadData={this.props.preloadData}
          />
        </Col>
        <Col sm={6}></Col>
      </Row>
    );
  }
}

export default connect(null, {
  captchaOlafData,
})(AboutYou);
