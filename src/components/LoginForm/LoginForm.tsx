import React, { Component, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { loginUser } from '../../services/apollo/session/account/api';
import { loginSuccess } from '../../utils/auth-helpers';
import { IState, IProps } from './interface';

class LoginForm extends Component<IProps, IState> {
  state: IState = {
    password: '',
    emailAddress: '',
    errors: {},
    success: false,
  };

  handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { emailAddress, password } = this.state;
    try {
      const result = await loginUser(emailAddress, password);
      const token = result.data.login || '';
      // >>> check tokens existence <<<
      if (token) {
        // >>> probably no need for success true if redirecting <<<
        this.setState({ success: true }, () => {
          loginSuccess(result.data.login);
        });
      }
    } catch (err) {
      console.log('promise rejected:', err);
      this.setState({ success: false });
    }
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };

  render() {
    return (
      <form onSubmit={this.handleLogin} id="login-form" className="form">
        <div className="form--item">
          <label>Email Address</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="emailAddress"
            type="email"
            id="loginInputEmail"
          />
        </div>
        <div className="form--item">
          <label>Password</label>
          <input
            onChange={(e) => this.handleInputChange(e)}
            name="password"
            type="password"
            id="loginInputPassword"
          />
        </div>
        <div>
          <Link href={'/account/password-request'}>
            <a>Forgot password?</a>
          </Link>
        </div>
        <div>
          <button id="loginButton" type="submit">
            Submit
          </button>
          {this.state.success ? <p id="loginSuccess">Login Success</p> : null}
        </div>
      </form>
    );
  }
}

export default LoginForm;
