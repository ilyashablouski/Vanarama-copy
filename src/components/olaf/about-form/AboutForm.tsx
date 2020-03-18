import React from 'react';
import { genMonths, genYears } from '../../../utils/helpers';
import Select from '@vanarama/uibook/packages/ui-components/src/css/atoms/Select';
import Input from '@vanarama/uibook/packages/ui-components/src/css/atoms/TextInput';
import Button from '@vanarama/uibook/packages/ui-components/src/css/atoms/Button/Button';
import '@vanarama/uibook/packages/ui-components/src/css/atoms/Checkbox/Checkbox.css';

import { Row, Col } from 'react-grid-system';
import { IProps, IState } from './interface';

class AboutForm extends React.Component<IProps, IState> {
  state: IState = {
    details: {
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      monthOfBirth: '',
      dayOfBirth: 0,
      yearOfBirth: 0,
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
    this.props.submit(this.state.details);
  };

  // >>>removed type checking for <HTMLInputElement | HTMLSelectElement> as checked does not exist ???
  handleInputChange = (e): void => {
    const { name, value, checked, type } = e.currentTarget;
    const val = type === 'checkbox' ? checked : value;
    if (Object.keys(this.state.details).includes(name)) {
      this.setState(prevState => ({
        ...prevState,
        details: { ...prevState.details, [name]: val },
      }));
    }
  };

  render() {
    const months: string[] = genMonths() || [];
    const years: number[] = genYears(100) || [];
    const { details } = this.state;
    const { allDropDowns = {} } = this.props;

    return (
      <form onSubmit={this.handleSubmission} id="aboutForm" className="form">
        <Row>
          <Col>
            <label>Title</label>
            <Select
              name="title"
              onChange={this.handleInputChange}
              options={allDropDowns.titles || {}}
              id="aboutSelectTitle"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label="First Name"
              handleChange={this.handleInputChange}
              type="text"
              name="firstName"
              value={details.firstName}
              id="aboutInputFirstName"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label="Last Name"
              handleChange={this.handleInputChange}
              type="text"
              name="lastName"
              value={details.lastName}
              id="aboutInputLastName"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label="Email"
              handleChange={this.handleInputChange}
              type="email"
              name="email"
              value={details.email}
              id="aboutInputEmail"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label="Phone Number"
              handleChange={this.handleInputChange}
              type="tel"
              name="mobile"
              value={details.mobile}
              id="aboutInputPhoneNumber"
            />
          </Col>
        </Row>
        <Row>
          <Col sm={10}>
            <label>Date of Birth</label>
            <Row>
              <Col sm={4}>
                <Select
                  id="aboutSelectDOB"
                  name="dayOfBirth"
                  onChange={this.handleInputChange}
                  options={{
                    data: [...Array(31)].map((_, i) => ({
                      value: i + 1,
                    })),
                  }}
                />
              </Col>
              <Col sm={4}>
                <Select
                  id="aboutSelectMOB"
                  name="monthOfBirth"
                  onChange={this.handleInputChange}
                  options={{
                    data: months.map(month => ({
                      value: month,
                    })),
                  }}
                />
              </Col>
              <Col sm={4}>
                <Select
                  id="aboutSelectYOB"
                  name="yearOfBirth"
                  onChange={this.handleInputChange}
                  options={{
                    data: years.map(year => ({
                      value: year,
                    })),
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Country of Birth</label>
            <Select
              name="countryOfBirth"
              onChange={this.handleInputChange}
              options={allDropDowns.countries || {}}
              id="aboutSelectCOB"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Nationality</label>
            <Select
              name="nationality"
              onChange={this.handleInputChange}
              options={allDropDowns.nationalities || {}}
              id="aboutSelectNationality"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Marital Status</label>
            <Select
              name="maritalStatus"
              onChange={this.handleInputChange}
              options={allDropDowns.maritalStatuses || {}}
              id="aboutSelectMarStatus"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label>No. of Dependants</label>
            <Select
              name="dependants"
              onChange={this.handleInputChange}
              options={allDropDowns.noOfDependants || {}}
              id="aboutSelectDependants"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label>No. of Adults in Household</label>
            <Select
              name="adultsInHousehold"
              onChange={this.handleInputChange}
              options={allDropDowns.noOfAdultsInHousehold || {}}
              id="aboutSelectAdultsInHouse"
            />
          </Col>
        </Row>
        <br />
        <div role="presentation">
          <div className="Form__item -Checkbox__wrapper">
            <input
              onChange={this.handleInputChange}
              className="Checkbox"
              type="checkbox"
              name="consent"
              id="aboutInputConsent"
            />
            <label className="Checkbox__label" htmlFor="aboutInputConsent">
              <span className="Text -secondary">
                I wish to receive emails and SMS messages for updates on the
                latest deals, offers and promotions.
              </span>
            </label>
          </div>
          <div className="Form__item -Checkbox__wrapper">
            <input
              onChange={this.handleInputChange}
              className="Checkbox"
              type="checkbox"
              name="termsAndCons"
              id="aboutInputT&C"
            />
            <label className="Checkbox__label" htmlFor="aboutInputT&C">
              <span className="Text -secondary">
                agree to the terms and conditions.
              </span>
            </label>
          </div>
        </div>
        <br />
        <Button type="submit" label="Continue" color="primary" />
      </form>
    );
  }
}

export default AboutForm;
