import { FC } from 'react';
import AboutForm from '../../components/Olaf/AboutForm';
import { Row, Col } from 'antd';

export const AboutYou: FC<{}> = () => (
  <>
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

export default AboutYou;
