import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import Router from 'next/router';

interface PasswordRequestProps extends FormComponentProps {
  onPasswordRequest: (email: string) => void;
}

class PasswordRequest extends React.Component<PasswordRequestProps> {
  constructor(props: PasswordRequestProps) {
    super(props);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onPasswordRequest(values.email);
        Router.push('/account/password-reset');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="password-request">
        <h1>Forgot Your Password?</h1>
        <p>Enter your email address below and we'll send you a password reset link by email.</p>

        <div>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <p>Email</p>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input  />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Reset password
              </Button>
            </Form.Item>
          </Form>
        </div>
    </div>
    );
  }
}

export default Form.create<PasswordRequestProps>()(PasswordRequest);
