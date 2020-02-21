import { Component } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
/* import Header from '@vanarama/uibook/src/atomic/organisms/Header';
import Footer from '@vanarama/uibook/src/atomic/organisms/Footer'; */
import AboutForm from '../../components/Olaf/AboutForm';
import { Row, Col } from 'antd';

//convert to functional component
export class AboutYou extends Component<{}> {
  render() {
    return (
      <>
        {/*<Header/>*/}
        <Row>
          <Col span={12} offset={6}>
            <h1>About You</h1>
            <h3 className="Heading__Caption">
              We just need some initial details for your credit check.
            </h3>
            <AboutForm />
          </Col>
        </Row>
        {/*<Footer />*/}
      </>
    );
  }
}

export default AboutYou;
