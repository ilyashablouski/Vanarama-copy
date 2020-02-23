import { Component, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { allDropdownData } from '../../../gql/olaf/api';
import * as olafActions from 'redux/actions/olaf_actions';
import { genMonths, genYears } from '../../../utils/helpers';
import Select from '../../Select/Select';
import '@vanarama/uibook/src/css/atoms/Select/Select.css';
import IosArrowDown from 'react-ionicons/lib/IosArrowDown';

import { Input, Checkbox, Row, Col, Button } from 'antd';

import dropDownData from './stub';

interface IProps {
  captchaFormData: (pageRef: string, data: {}) => void;
}

interface IDetails {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dayOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
  countryOfBirth: string;
  nationality: string;
  maritalStatus: string;
  dependants: string;
  adultsInHousehold: string;
  termsAndCons: boolean;
  updates: boolean;
}

interface IState {
  details: IDetails;
  allDropDowns: any;
}

export class AboutForm extends Component<IProps, IState> {
  state: IState = {
    details: {
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      dayOfBirth: '',
      monthOfBirth: '',
      yearOfBirth: '',
      countryOfBirth: '',
      nationality: '',
      maritalStatus: '',
      dependants: '',
      adultsInHousehold: '',
      termsAndCons: false,
      updates: false,
    },
    allDropDowns: {},
  };

  async componentDidMount(): Promise<void> {
    try {
      //const { allDropDowns } = dropDownData.data;
      const { data } = await allDropdownData();
      const { allDropDowns } = data;
      this.setState({ allDropDowns }, () => {
        console.log(this.state.allDropDowns);
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleSubmission = (e: FormEvent<HTMLInputElement>): void => {};

  handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.currentTarget;
    if (Object.keys(this.state.details).includes(name)) {
      this.setState(
        (prevState) => ({
          ...prevState,
          details: { ...prevState.details, [name]: value },
        }),
        () => console.log(this.state),
      );
    }
  };

  render() {
    const months: string[] = genMonths() || [];
    const years: number[] = genYears(100) || [];
    const{firstName, lastName, email, mobile } = this.state.details

    return (
      <form onSubmit={null} id="about-form" className="form">
        <Row>
          <Col>
            <label>Title</label>
            <Select
              name="title"
              onChange={this.handleInputChange}
              values={
                this.state.allDropDowns.titles &&
                this.state.allDropDowns.titles.map((value) => ({
                  value,
                }))
              }
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
                values={[...Array(31)].map((_, i) => ({
                  value: i + 1,
                }))}
              />
            </Col>

            <Col span={8}>
              <Select
                name="monthOfBirth"
                onChange={this.handleInputChange}
                values={months.map((month) => ({
                  value: month,
                }))}
              />
            </Col>
            <Col span={8}>
              <Select
                name="yearOfBirth"
                onChange={this.handleInputChange}
                values={years.map((year) => ({
                  value: year,
                }))}
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
              values={
                this.state.allDropDowns.countries &&
                this.state.allDropDowns.countries.map((value) => ({
                  value,
                }))
              }
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
              values={
                this.state.allDropDowns.nationalities &&
                this.state.allDropDowns.nationalities.map((value) => ({
                  value,
                }))
              }
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
              values={
                this.state.allDropDowns.maritalStatuses &&
                this.state.allDropDowns.maritalStatuses.map((value) => ({
                  value,
                }))
              }
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
              values={
                this.state.allDropDowns.noOfDependants &&
                this.state.allDropDowns.noOfDependants.map((value) => ({
                  value,
                }))
              }
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
              values={
                this.state.allDropDowns.noOfAdultsInHousehold &&
                this.state.allDropDowns.noOfAdultsInHousehold.map((value) => ({
                  value,
                }))
              }
              id={'aboutInputAdultsHoushold'}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Checkbox name="updates">
              I wish to receive emails and SMS messages for updates on the
              latest deals, offers and promotions.
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox name="termsAndCons">
              agree to the terms and conditions.
            </Checkbox>
          </Col>
        </Row>
        <br />
        <Button type="primary">Continue</Button>
      </form>
    );
  }
}

export default connect((state) => state, { ...olafActions })(AboutForm);
