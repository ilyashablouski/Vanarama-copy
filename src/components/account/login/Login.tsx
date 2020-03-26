import React, { ChangeEvent } from 'react';
import localForage from 'localforage';
import Input from '@vanarama/uibook/packages/ui-components/src/components/atoms/textinput';
import Button from '@vanarama/uibook/packages/ui-components/src/components/atoms/button';
import Link from '@vanarama/uibook/packages/ui-components/src/components/atoms/link';
import FormGroup from '@vanarama/uibook/packages/ui-components/src/components/molecules/formgroup';
import { LoginProps, LoginState } from './interfaces';

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      password: '',
      token: null,
    };
  }

  componentDidUpdate() {
    const { token } = this.props;
    if (token) {
      localForage.setItem('va-token', token);
    }
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { login } = this.props;

    login(email, password);
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.currentTarget;

    if (Object.keys(this.state).includes(name)) {
      this.setState(prevState => ({ ...prevState, [name]: value }));
    }
  };

  render() {
    const { email, password } = this.state;
    const { authenticated } = this.props;

    return (
      <form onSubmit={this.handleSubmit} id="loginForm" className="form">
        <FormGroup>
          <Input
            id="loginEmail"
            label="Your Email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            id="loginPassword"
            label="Your Password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Link id="forgotPassword" href="password-request">
            forgot your password?
          </Link>
        </FormGroup>
        <FormGroup>
          <Button
            id="loginButton"
            type="submit"
            label="Login"
            color="primary"
          />
        </FormGroup>
        {authenticated ? (
          <p id="loginStatus">Login Success</p>
        ) : (
          <p id="loginFailure">Login Failed</p>
        )}
      </form>
    );
  }
}

export default Login;
