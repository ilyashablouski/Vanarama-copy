import * as React from 'react';
import { connect } from 'react-redux';
import { allDropdownData, createUpdatePerson } from '../../../apollo/olaf/api';
import { captchaFormData } from '../../../redux/actions/olaf_actions';
import { genMonths, genYears } from '../../../utils/helpers';
import Select from '@vanarama/uibook/packages/ui-components/src/css/atoms/Select';
import '@vanarama/uibook/packages/ui-components/src/css/atoms/Button/Button.css';
import '@vanarama/uibook/packages/ui-components/src/css/atoms/Checkbox/Checkbox.css';

import { IProps, IState } from './interface';

//>>> still to be replaced <<<
import { Input, Row, Col } from 'antd';

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
    allDropDowns: {},
  };

  // >>> console logs still to be removed <<<
  async componentDidMount(): Promise<void> {
    try {
      const { data } = await allDropdownData();
      const { allDropDowns } = data;
      this.setState({ allDropDowns }, () => {
        console.log(this.state.allDropDowns);
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createUpdatePerson(this.state.details);
      console.log(res);
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
    const { firstName, lastName, email, mobile } = this.state.details;

    return (
      <form onSubmit={this.handleSubmission} id="aboutForm" className="form">
        <Row>
          <Col>
            <label>Title</label>
            <Select
              name="title"
              onChange={this.handleInputChange}
              options={this.state.allDropDowns.titles || {}}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label>First Name</label>
            <Input
              onChange={this.handleInputChange}
              onBlur={(e) => e}
              type="text"
              name="firstName"
              value={firstName}
              id={'aboutInputFirstName'}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Last Name</label>
            <Input
              onChange={this.handleInputChange}
              onBlur={(e) => e}
              type="text"
              name="lastName"
              value={lastName}
              id={'aboutInputLastName'}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Email</label>
            <Input
              onChange={this.handleInputChange}
              onBlur={(e) => e}
              type="email"
              name="email"
              value={email}
              id={'aboutInputEmail'}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Phone Number</label>
            <Input
              onChange={this.handleInputChange}
              onBlur={(e) => e}
              type="tel"
              name="mobile"
              value={mobile}
              id={'aboutInputPhoneNumber'}
            />
          </Col>
        </Row>
        <Row>
          <label>Date of Birth</label>
          <Row>
            <Col span={8}>
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
            <Col span={8}>
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
            <Col span={8}>
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
        </Row>
        <Row>
          <Col>
            <label>Country of Birth</label>
            <Select
              name="countryOfBirth"
              onChange={this.handleInputChange}
              options={this.state.allDropDowns.countries || {}}
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
              options={this.state.allDropDowns.nationalities || {}}
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
              options={this.state.allDropDowns.maritalStatuses || {}}
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
              options={this.state.allDropDowns.noOfDependants || {}}
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
              options={this.state.allDropDowns.noOfAdultsInHousehold || {}}
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
        <button className="Button -primary -regular -solid" type="submit">
          <div className="Button__inner">Continue</div>
        </button>
      </form>
    );
  }
}

export default connect((state) => state, { ...captchaFormData })(AboutForm);
