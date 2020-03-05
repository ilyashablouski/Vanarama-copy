import { Component } from 'react';
import { NextPage, NextPageContext } from 'next';
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
  static async getInitialProps(ctx): Promise<Object> {
    const { aboutYou } = ctx.store.getState().olaf;
    try {
      const allDropDowns = await allDropdownData();
      return { allDropDowns, preloadData: aboutYou };
    } catch (e) {
      console.log(e);
    }
  }

  createPersonHandle = async (details: IDetails) => {
    try {
      const { data } = await createUpdatePerson(details);
      this.props.captchaOlafData('aboutYou', data.createUpdatePerson);
    } catch (e) {
      console.log(e);
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
            submit={this.createPersonHandle}
            allDropDowns={this.props.allDropDowns}
            preloadData={this.props.preloadData}
          />
        </Col>
        <Col sm={6}></Col>
      </Row>
    );
  }
}

/* const AboutYou: NextPage<{ allDropDowns: Object; preloadData: Object}> = (
  props,
) => {
  const createPersonHandle = async (details: IDetails) => {
    try {
      const { data } = await createUpdatePerson(details);
      props.captchaOlafData('aboutYou', data.createUpdatePerson);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Row>
      <Col sm={6}>
        <h1>About You</h1>
        <h3 className="Heading__Caption">
          We just need some initial details for your credit check.
        </h3>
        <AboutForm
          submit={createPersonHandle}
          allDropDowns={props.allDropDowns}
          preloadData={props.preloadData}
        />
      </Col>
      <Col sm={6}></Col>
    </Row>
  );
};

AboutYou.getInitialProps = async (ctx: NextPageContext) => {
  const { aboutYou } = ctx.store.getState().olaf;
  console.log("stoororororo", ctx.store)
  try {
    const allDropDowns = await allDropdownData();
    return { allDropDowns, preloadData: aboutYou };
  } catch (e) {
    console.log(e);
  }
}; */

export default connect(null, {
  captchaOlafData,
})(AboutYou);
