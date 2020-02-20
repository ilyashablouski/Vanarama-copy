import { Component, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import { getDropdownData } from '../../gql/olaf/service';
import * as olafActions from 'redux/actions/olaf_actions';
/* import Button from '@vanarama/uibook/src/atomic/atoms/Button';
import Header from '@vanarama/uibook/src/atomic/organisms/Header';
import Footer from '@vanarama/uibook/src/atomic/organisms/Footer';
import Field from '@vanarama/uibook/src/atomic/atoms/Field'; */
import { Select, Input } from 'antd';
import 'antd/dist/antd.css';
const { Option } = Select;

interface DropDownData {}

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
  dropDownData: Object;
}

export class AboutYou extends Component<IProps, IState> {
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
    dropDownData: {},
  };

  async componentDidMount(): Promise<void> {
    try {
      const { data } = await getDropdownData();

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
      <>
        {/*<Header/>*/}
        <section>
          <h1>About You</h1>
          <span className="Heading__Caption">
            We just need some initial details for your credit check.
          </span>
          <form onSubmit={null} id="about-form" className="form">
            <div>
              <Select
                onChange={(e) => this.handleInputChange(e)}
                value={this.state.title}
                id={'aboutInputEmail'}
              >
                <Option value=""></Option>
              </Select>
            </div>
            <div>
              <label>Email Address</label>
              {/* <Input
                handleChange={this.handleInputChange}
                handleBlur={(e) => e}
                type="text"
                name="title"
                value={this.state.title}
                id={'aboutInputEmail'}
              /> */}
            </div>
          </form>
        </section>
        {/*<Footer />*/}
      </>
    );
  }
}

export default connect((state) => state, { ...olafActions })(AboutYou);
