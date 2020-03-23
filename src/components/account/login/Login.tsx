import React, { ChangeEvent } from 'react';
import { Row, Col } from 'react-grid-system';
import localForage from 'localforage';
import Input from '@vanarama/uibook/src/components/atoms/textinput';
import Button from '@vanarama/uibook/src/components/atoms/button';
import Link from '@vanarama/uibook/src/components/atoms/link';
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
      <section>
        <form onSubmit={this.handleSubmit} id="loginForm" className="form">
          <Row style={{ marginBottom: '16px' }}>
            <Col>
              <Input
                id="loginEmail"
                label="Your Email"
                type="text"
                name="email"
                value={email}
                onChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: '16px' }}>
            <Col>
              <Input
                id="loginPassword"
                label="Your Password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: '16px' }}>
            <Col>
              <Link id="forgotPassword" href="password-request">
                forgot your password?
              </Link>
            </Col>
          </Row>
          <Row style={{ marginBottom: '16px' }}>
            <Col>
              <Button
                id="loginButton"
                type="submit"
                label="Login"
                color="primary"
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: '16px' }}>
            <Col>
              {authenticated ? <p id="loginStatus">Login Success</p> : null}
              {authenticated === false ? (
                <p id="loginFailure">Login Failed</p>
              ) : null}
            </Col>
          </Row>
        </form>
      </section>
    );
  }
}

export default Login;
