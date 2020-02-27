import * as React from 'react';
import { connect } from 'react-redux';
import { allDropdownData, createUpdatePerson } from '../../../apollo/olaf/api';
import { captchaOlafData } from '../../../redux/actions/olaf_actions';
import { genMonths, genYears } from '../../../utils/helpers';
import Select from '@vanarama/uibook/packages/ui-components/src/css/atoms/Select';
import Input from '@vanarama/uibook/packages/ui-components/src/css/atoms/TextInput';
import Button from '@vanarama/uibook/packages/ui-components/src/css/atoms/Button/Button';
import '@vanarama/uibook/packages/ui-components/src/css/atoms/Checkbox/Checkbox.css';
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
    const { firstName, lastName, email, mobile } = this.state.details;

    return (
      <form onSubmit={this.handleSubmission} id="aboutForm" className="form">
        <div className="Form__item">
          <label>Title</label>
          <Select
            name="title"
            onChange={this.handleInputChange}
            options={this.state.allDropDowns.titles || {}}
          />
        </div>
        <div className="Form__item">
          <Input
            label="First Name"
            handleChange={this.handleInputChange}
            type="text"
            name="firstName"
            value={firstName}
            id="aboutInputFirstName"
          />
        </div>
        <div className="Form__item">
          <Input
            label="Last Name"
            handleChange={this.handleInputChange}
            type="text"
            name="lastName"
            value={lastName}
            id="aboutInputLastName"
          />
        </div>
        <div className="Form__item">
          <Input
            label="Email"
            handleChange={this.handleInputChange}
            type="email"
            name="email"
            value={email}
            id="aboutInputEmail"
          />
        </div>
        <div className="Form__item">
          <Input
            label="Phone Number"
            handleChange={this.handleInputChange}
            type="tel"
            name="mobile"
            value={mobile}
            id="aboutInputPhoneNumber"
          />
        </div>
        <div className="Form__item">
          <label>Date of Birth</label>

          <div>
            <Select
              name="dayOfBirth"
              onChange={this.handleInputChange}
              options={{
                data: [...Array(31)].map((_, i) => ({
                  value: i + 1,
                })),
              }}
            />
          </div>
          <div>
            <Select
              name="monthOfBirth"
              onChange={this.handleInputChange}
              options={{
                data: months.map((month) => ({
                  value: month,
                })),
              }}
            />
          </div>
          <div>
            <Select
              name="yearOfBirth"
              onChange={this.handleInputChange}
              options={{
                data: years.map((year) => ({
                  value: year,
                })),
              }}
            />
          </div>
        </div>
        <div className="Form__item">
          <label>Country of Birth</label>
          <Select
            name="countryOfBirth"
            onChange={this.handleInputChange}
            options={this.state.allDropDowns.countries || {}}
            id={'aboutInputCOB'}
          />
        </div>
        <div className="Form__item">
          <label>Nationality</label>
          <Select
            name="nationality"
            onChange={this.handleInputChange}
            options={this.state.allDropDowns.nationalities || {}}
            id={'aboutInputNationality'}
          />
        </div>
        <div className="Form__item">
          <label>Marital Status</label>
          <Select
            name="maritalStatus"
            onChange={this.handleInputChange}
            options={this.state.allDropDowns.maritalStatuses || {}}
            id={'aboutInputMarStatus'}
          />
        </div>
        <div className="Form__item">
          <label>No. of Dependants</label>
          <Select
            name="dependants"
            onChange={this.handleInputChange}
            options={this.state.allDropDowns.noOfDependants || {}}
            id={'aboutInputMarDependants'}
          />
        </div>
        <div className="Form__item">
          <label>No. of Adults in Household</label>
          <Select
            name="adultsInHousehold"
            onChange={this.handleInputChange}
            options={this.state.allDropDowns.noOfAdultsInHousehold || {}}
            id={'aboutInputAdultsHoushold'}
          />
        </div>
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
