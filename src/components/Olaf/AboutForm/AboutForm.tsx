import { Component, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { getDropdownData } from '../../../gql/olaf/api_functions';
import * as olafActions from 'redux/actions/olaf_actions';
import { Select, Input, Checkbox, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/es/form';
const { Option } = Select;

import dropDownData from './stub';

interface IProps {
  captchaFormData: (pageRef: string, data: {}) => void;
}

interface IState {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dob: string;
  cob: string;
  nationality: string;
  maritalStatus: string;
  Dependents: string;
  AdultsInHousehold: string;
  termsAndCons: boolean;
  updates: boolean;
  allDropDowns: any;
}

export class AboutForm extends Component<IProps, IState> {
  state: IState = {
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dob: '',
    cob: '',
    nationality: '',
    maritalStatus: '',
    Dependents: '',
    AdultsInHousehold: '',
    termsAndCons: false,
    updates: false,
    allDropDowns: {},
  };

  async componentDidMount(): Promise<void> {
    try {
      //const { data } = await getDropdownData();
      const { allDropDowns } = dropDownData.data;
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
    if (Object.keys(this.state).includes(name)) {
      this.setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  render() {
    return (
      <form onSubmit={null} id="about-form" className="form">
        <Row>
          <Col>
            <label>Title</label>
            <Select
              onChange={this.handleInputChange}
              id={'aboutInputEmail'}
            >
              <Option value=""></Option>
              {this.state.allDropDowns.titles &&
                this.state.allDropDowns.titles.map((title, i) => (
                  <Option key={i} value={title}>
                    {title}
                  </Option>
                ))}
            </Select>
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
              value={this.state.title}
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
              value={this.state.title}
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
              value={this.state.title}
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
              type="text"
              name="phoneNumber"
              value={this.state.title}
              id={'aboutInputPhoneNumber'}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Country of Birth</label>
            <Select
              onChange={this.handleInputChange}
              id={'aboutInputEmail'}
            >
              <Option value=""></Option>
              {this.state.allDropDowns.countries &&
                this.state.allDropDowns.countries.map((title, i) => (
                  <Option key={i} value={title}>
                    {title}
                  </Option>
                ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Nationality</label>
            <Select
              onChange={this.handleInputChange}
              id={'aboutInputEmail'}
            >
              <Option value=""></Option>
              {this.state.allDropDowns.nationalities &&
                this.state.allDropDowns.nationalities.map((title, i) => (
                  <Option key={i} value={title}>
                    {title}
                  </Option>
                ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Marital Status</label>
            <Select
              onChange={this.handleInputChange}
              id={'aboutInputEmail'}
            >
              <Option value=""></Option>
              {this.state.allDropDowns.maritalStatuses &&
                this.state.allDropDowns.maritalStatuses.map((title, i) => (
                  <Option key={i} value={title}>
                    {title}
                  </Option>
                ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>No. of Dependants</label>
            <Select
              onChange={this.handleInputChange}
              id={'aboutInputEmail'}
            >
              <Option value=""></Option>
              {this.state.allDropDowns.noOfDependants &&
                this.state.allDropDowns.noOfDependants.map((title, i) => (
                  <Option key={i} value={title}>
                    {title}
                  </Option>
                ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>No. of Adults in Household</label>
            <Select
              onChange={this.handleInputChange}
              id={'aboutInputEmail'}
            >
              <Option value=""></Option>
              {this.state.allDropDowns.noOfAdultsInHousehold &&
                this.state.allDropDowns.noOfAdultsInHousehold.map(
                  (title, i) => (
                    <Option key={i} value={title}>
                      {title}
                    </Option>
                  ),
                )}
            </Select>
          </Col>
        </Row>
      </form>
    );
  }
}

export default connect((state) => state, { ...olafActions })(AboutForm);
