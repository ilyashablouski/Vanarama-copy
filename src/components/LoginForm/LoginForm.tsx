import React, { Component, ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import localForage from 'localforage';
import { loginUser } from '../../apollo/session/account/api';
import * as sessionActions from '../../redux/actions/session_actions';
import {IState, IProps} from './interface'

class LoginForm extends Component<IProps, IState> {
  state: IState = {
    password: '',
    emailAddress: '',
    token: '',
    errors: {},
    success: false,
  };

  handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { emailAddress, password } = this.state;
    try {
      const result =  await loginUser(emailAddress, password);
      this.setState({ token: result.data.login, success: true }, () => {
        this.props.updateSession(this.state.success, {});
      });
    } catch (err) {
      this.setState({ success: false });
      console.log('login failed:', err);
    }
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };

  componentDidUpdate(_, prevState) {
    if (prevState.token !== this.state.token) {
      localForage.setItem('tmpLogin-token', this.state.token);
    }
  }

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
<<<<<<< HEAD
          <button id="loginButton" type="submit">
            Submit
          </button>
          {this.state.success ? <p id="loginSuccess">Login Success</p> : null}
=======
        <Link
          href={'/account/password-request'}
        >
          <a>Forgot password?</a>
        </Link>
        </div>
        <div>
          <button id="loginButton" type="submit">Submit</button>
          {this.state.success ?
            <p id="loginSuccess">Login Success</p> :
            null
          }
>>>>>>> origin
        </div>
      </form>
    );
  }
}

export default connect((state) => state, { ...sessionActions })(LoginForm);
