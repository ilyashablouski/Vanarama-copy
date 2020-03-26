import React, { ChangeEvent } from 'react';
import Input from '@vanarama/uibook/packages/ui-components/src/components/atoms/textinput';
import Button from '@vanarama/uibook/packages/ui-components/src/components/atoms/button';
import FormGroup from '@vanarama/uibook/packages/ui-components/src/components/molecules/formgroup';
import { IRegisterProps, IRegisterState } from './interfaces';

class Register extends React.Component<IRegisterProps, IRegisterState> {
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
    const { register } = this.props;
    const { email, password } = this.state;

    register(email, password);
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
          <FormGroup>
            <Input
              id="registerEmail"
              label="Your Email"
              type="text"
              name="email"
              value={email}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="registerPassword"
              label="Your Password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="registerRepeatPassword"
              label="Repeat Password"
              type="password"
              name="repeatPassword"
              value={repeatPassword}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Button
              id="registerButton"
              type="submit"
              label="Register"
              color="primary"
            />
          </FormGroup>
        </form>
      </section>
    );
  }
}

export default Register;
