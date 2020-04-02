import { Component } from 'react';
import { Row, Col } from 'react-grid-system';

import Heading from '@vanarama/uibook/packages/ui-components/src/components/atoms/heading';
import Text from '@vanarama/uibook/packages/ui-components/src/components/atoms/text';
import FormGroup from '@vanarama/uibook/packages/ui-components/src/components/molecules/formgroup';
import Select from '@vanarama/uibook/packages/ui-components/src/components/atoms/select/';
import Input from '@vanarama/uibook/packages/ui-components/src/components/atoms/textinput/';
import Button from '@vanarama/uibook/packages/ui-components/src/components/atoms/button/';
// import CheckBox from '@vanarama/uibook/packages/ui-components/src/components/atoms/checkbox/';
import { genMonths, genYears } from '../../../services/utils/helpers';

import { IProps, IState } from './interface';

class AboutForm extends Component<IProps, IState> {
  state: IState = {
    details: {
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      monthOfBirth: '',
      dayOfBirth: '',
      yearOfBirth: '',
      countryOfBirth: '',
      nationality: '',
      maritalStatus: '',
      dependants: '',
      adultsInHousehold: '',
      termsAndCons: false,
      consent: false,
    },
  };

  handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { details } = this.state;
    const { submit } = this.props;

    submit(details);
  };

  // >>>removed type checking for <HTMLInputElement | HTMLSelectElement> as checked does not exist ???
  handleInputChange = (e): void => {
    const { name, value, checked, type } = e.currentTarget;
    const val = type === 'checkbox' ? checked : value;
    const { details } = this.state;

    if (Object.keys(details).includes(name)) {
      this.setState(
        prevState => ({
          details: { ...prevState.details, [name]: val },
        }),
        () => console.log(this.state),
      );
    }
  };

  render() {
    const months: string[] = genMonths() || [];
    const years: number[] = genYears(100) || [];
    const { details } = this.state;
    const { allDropDowns = {} } = this.props;

    return (
      <form onSubmit={this.handleSubmission} id="aboutForm" className="form">
        <Heading color="black" size="xlarge">
          About You
        </Heading>
        <Text color="darker" size="lead">
          We just need some initial details for your credit check.
        </Text>
        <FormGroup legend="Title">
          <Select
            name="title"
            onChange={this.handleInputChange}
            options={allDropDowns.titles}
            id="aboutSelectTitle"
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="First Name"
            onChange={this.handleInputChange}
            type="text"
            name="firstName"
            value={details.firstName}
            id="aboutInputFirstName"
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Last Name"
            onChange={this.handleInputChange}
            type="text"
            name="lastName"
            value={details.lastName}
            id="aboutInputLastName"
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Email"
            onChange={this.handleInputChange}
            type="email"
            name="email"
            value={details.email}
            id="aboutInputEmail"
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Phone Number"
            onChange={this.handleInputChange}
            type="tel"
            name="mobile"
            value={details.mobile}
            id="aboutInputPhoneNumber"
          />
        </FormGroup>
        <FormGroup legend="Date of Birth">
          <Row>
            <Col sm={4}>
              <Select
                id="aboutSelectDOB"
                name="dayOfBirth"
                onChange={this.handleInputChange}
                options={{
                  data: [...Array(31)].map((_, i) => (i + 1).toString()),
                }}
              />
            </Col>
            <Col sm={4}>
              <Select
                id="aboutSelectMOB"
                name="monthOfBirth"
                onChange={this.handleInputChange}
                options={{
                  data: months,
                }}
              />
            </Col>
            <Col sm={4}>
              <Select
                id="aboutSelectYOB"
                name="yearOfBirth"
                onChange={this.handleInputChange}
                options={{
                  data: years.map(year => year.toString()),
                }}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup legend="Country of Birth">
          <Select
            name="countryOfBirth"
            onChange={this.handleInputChange}
            options={allDropDowns.countries}
            id="aboutSelectCOB"
          />
        </FormGroup>
        <FormGroup legend="Nationality">
          <Select
            name="nationality"
            onChange={this.handleInputChange}
            options={allDropDowns.nationalities}
            id="aboutSelectNationality"
          />
        </FormGroup>
        <FormGroup legend="Marital Status">
          <Select
            name="maritalStatus"
            onChange={this.handleInputChange}
            options={allDropDowns.maritalStatuses}
            id="aboutSelectMarStatus"
          />
        </FormGroup>
        <FormGroup legend="No. of Dependants">
          <Select
            name="dependants"
            onChange={this.handleInputChange}
            options={allDropDowns.noOfDependants}
            id="aboutSelectDependants"
          />
        </FormGroup>
        <FormGroup legend="No. of Adults in Household">
          <Select
            name="adultsInHousehold"
            onChange={this.handleInputChange}
            options={allDropDowns.noOfAdultsInHousehold}
            id="aboutSelectAdultsInHouse"
          />
        </FormGroup>
        {/* <CheckBox
          label="Please Confirm"
          onChange={this.handleInputChange}
          name="confirmation"
          checkboxes={[
            {
              name: 'consent',
              label:
                'I wish to receive emails and SMS messages for updates on the latest deals, offers and promotions.',
            },
            {
              name: 'termsAndCons',
              label: 'agree to the terms and conditions.',
            },
          ]}
          id="aboutInputCheckbox"
        /> */}

        <Button type="submit" label="Continue" color="primary" />
      </form>
    );
  }
}

export default AboutForm;
