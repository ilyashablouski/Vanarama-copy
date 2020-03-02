import * as React from 'react';
import { connect } from 'react-redux';
import { createUpdatePerson } from '../../../services/apollo/olaf/api';
import { captchaOlafData } from '../../../services/redux/olaf/actions';
import { genMonths, genYears } from '../../../utils/helpers';
import Select from '@vanarama/uibook/packages/ui-components/src/css/atoms/Select';
import Input from '@vanarama/uibook/packages/ui-components/src/css/atoms/TextInput';
import Button from '@vanarama/uibook/packages/ui-components/src/css/atoms/Button/Button';
import '@vanarama/uibook/packages/ui-components/src/css/atoms/Checkbox/Checkbox.css';

import { Row, Col } from 'react-grid-system';
import { IProps, IState } from './interface';

export class AboutForm extends React.Component<IProps, IState> {
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
      adultsInHousehold: 0,
      termsAndCons: false,
      consent: false,
    },
  };

  handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await createUpdatePerson(this.state.details);
      this.props.captchaOlafData('aboutYou', data.createUpdatePerson);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  //>>>removed type checking for <HTMLInputElement | HTMLSelectElement> as checked does not exist ???
  handleInputChange = (e): void => {
    const { name, value, checked, type } = e.currentTarget;
    const val = type === 'checkbox' ? checked : value;
    if (Object.keys(this.state.details).includes(name)) {
      this.setState(
        (prevState) => ({
          ...prevState,
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
    const { allDropDowns } = this.props;

    return (
      <form onSubmit={this.handleSubmission} id="aboutForm" className="form">
        <Row>
          <Col>
            <label>Title</label>
            <Select
              name="title"
              onChange={this.handleInputChange}
              options={allDropDowns.titles || {}}
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
          <Col sm={5}>
            <label>Date of Birth</label>
            <Row>
              <Col sm={4}>
                <Select
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
                  name="monthOfBirth"
                  onChange={this.handleInputChange}
                  options={{
                    data: months.map((month) => ({
                      value: month,
                    })),
                  }}
                />
              </Col>
              <Col sm={4}>
                <Select
                  name="yearOfBirth"
                  onChange={this.handleInputChange}
                  options={{
                    data: years.map((year) => ({
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
              id={'aboutInputCOB'}
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
              id={'aboutInputNationality'}
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
              id={'aboutInputMarStatus'}
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
              id={'aboutInputMarDependants'}
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
              id={'aboutInputAdultsHoushold'}
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
              id={'aboutInputConsent'}
            />
            <label className="Checkbox__label" htmlFor={'aboutInputConsent'}>
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
              id={'aboutInputT&C'}
            />
            <label className="Checkbox__label" htmlFor={'aboutInputT&C'}>
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

export default connect((state) => state, { captchaOlafData })(AboutForm);
