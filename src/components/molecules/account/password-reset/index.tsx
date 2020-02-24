import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import Router from 'next/router';

interface PasswordResetProps extends FormComponentProps {
  onPasswordReset: (verificationCode: string, password: string) => void;
}

class PasswordReset extends React.Component<PasswordResetProps> {
  constructor(props: PasswordResetProps) {
    super(props);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onPasswordReset(values.verificationCode, values.password);
        Router.push('/login');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="password-request">
        <h1>Create New Password</h1>

        <div>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <p>Verification Code</p>
            <Form.Item>
              {getFieldDecorator('verificationCode', {
                rules: [{ required: true, message: 'Please input verificstion code!' }],
              })(
                <Input id="verificationCode" />,
              )}
            </Form.Item>
            <p>New Password</p>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password!' }],
              })(
                <Input id="password" />,
              )}
            </Form.Item>
            <p>Repeat Password</p>
            <Form.Item>
              {getFieldDecorator('repeatPassword', {
                rules: [{ required: true, message: 'Please input your password!' }],
              })(
                <Input id="repeatPassword" />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
    </div>
    );
  }
}

export default Form.create<PasswordResetProps>()(PasswordReset);
