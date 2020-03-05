import { NextPage, NextPageContext } from 'next';
import { captchaOlafData } from '../../services/redux/olaf/actions';
import {
  allDropdownData,
  createUpdatePerson,
} from '../../services/apollo/olaf/api';
import AboutForm from '../../components/olaf/about-form';
import { IDetails } from '../../components/olaf/about-form/interface';
import { Row, Col } from 'react-grid-system';

const AboutYou: NextPage<{ allDropDowns: any }> = (props) => {
  const createPersonHandle = async (details: IDetails) => {
    try {
      const { data } = await createUpdatePerson(details);
      captchaOlafData('aboutYou', data.createUpdatePerson);
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
        />
      </Col>
      <Col sm={6}></Col>
    </Row>
  );
};

AboutYou.getInitialProps = async (ctx: NextPageContext) => {
  try {
    const allDropDowns = await allDropdownData();
    return { allDropDowns };
  } catch (e) {
    console.log(e);
  }
};

export default AboutYou;
