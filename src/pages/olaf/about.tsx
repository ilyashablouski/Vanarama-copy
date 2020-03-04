import { Component } from 'react';
import { connect } from 'react-redux';
import { captchaOlafData } from '../../services/redux/olaf/actions';
import AboutForm from '../../components/olaf/about-form';
import { allDropdownData } from '../../services/apollo/olaf/api';
import { Row, Col } from 'react-grid-system';

export class AboutYou extends Component<{
  allDropDowns: any;
  details: Object;
}> {
  // >>> console logs still to be removed <<<
  static async getInitialProps(ctx): Promise<Object> {
    try {
      const allDropDowns = await allDropdownData();
      return { allDropDowns };
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Row>
        <Col sm={6}>
          <h1>About You</h1>
          <h3 className="Heading__Caption">
            We just need some initial details for your credit check.
          </h3>
          <AboutForm
            details={this.props.details}
            captchaOlafData={captchaOlafData}
            allDropDowns={this.props.allDropDowns}
          />
        </Col>
        <Col sm={6}></Col>
      </Row>
    );
  }
}

export default connect((state) => ({ details: state.olaf.aboutYou }), {
  captchaOlafData,
})(AboutYou);
