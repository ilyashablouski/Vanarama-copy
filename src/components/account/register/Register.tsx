import React, { ChangeEvent } from 'react';
import { Row, Col } from 'react-grid-system';
import Input from '@vanarama/uibook/packages/ui-components/src/css/atoms/TextInput';
import Button from '@vanarama/uibook/packages/ui-components/src/css/atoms/Button/Button';
import '@vanarama/uibook/packages/ui-components/src/css/theme/helpers/classes.css';
import { IRegisterProps, IRegisterState } from './interfaces';

class Regiter extends React.Component<IRegisterProps, IRegisterState> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      password: '',
      repeatPassword: '',
    };
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = this.state;

    this.props.register(email, password);
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.currentTarget;

    if (Object.keys(this.state).includes(name)) {
      this.setState(prevState => ({ ...prevState, [name]: value }));
    }
  };

  render() {
    const { email, password, repeatPassword } = this.state;

    return (
      <section>
        <form onSubmit={this.handleSubmit} id="loginForm" className="form">
          <Row style={{ marginBottom: '16px' }}>
            <Col>
              <Input
                id="registerEmail"
                label="Your Email"
                type="text"
                name="email"
                value={email}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: '16px' }}>
            <Col>
              <Input
                id="registerPassword"
                label="Your Password"
                type="password"
                name="password"
                value={password}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: '16px' }}>
            <Col>
              <Input
                id="registerRepeatPassword"
                label="Repeat Password"
                type="password"
                name="repeatPassword"
                value={repeatPassword}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: '16px' }}>
            <Col>
              <Button
                id="registerButton"
                type="submit"
                label="Register"
                color="primary"
              />
            </Col>
          </Row>
        </form>
      </section>
    );
  }
}

export default Regiter;
