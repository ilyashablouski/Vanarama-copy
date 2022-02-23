import React from 'react';
import dynamic from 'next/dynamic';
import TextInput from 'core/atoms/textinput';
import Formgroup from 'core/molecules/formgroup';
import { useForm } from 'react-hook-form';
import { ILoginFormProps, ILoginFormValues } from './interfaces';
import { emailValidator, passwordValidator } from './LoginForm.validate';
import Skeleton from '../Skeleton';

const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const Link = dynamic(() => import('core/atoms/link/'), {
  loading: () => <Skeleton count={1} />,
});
const ChevronForwardSharp = dynamic(
  () => import('core/assets/icons/ChevronForwardSharp'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Form = dynamic(() => import('core/organisms/form'), {
  loading: () => <Skeleton count={1} />,
});
const FormError = dynamic(() => import('core/organisms/form/FormError'), {
  loading: () => <Skeleton count={5} />,
});

const LoginForm: React.FC<ILoginFormProps> = ({
  hasError: error,
  isSubmitting,
  onSubmit,
}) => {
  const { handleSubmit, errors, register } = useForm<ILoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form
      dataTestId="login-form"
      invalid={error}
      onSubmit={handleSubmit(onSubmit)}
    >
      {error && (
        <FormError dataTestId="login-form_error">
          Email address and password combination is not valid
        </FormError>
      )}
      <Formgroup
        controlId="login-form_email"
        label="Your Email"
        error={errors.email?.message?.toString()}
      >
        <TextInput
          id="login-form_email"
          dataTestId="login-form_email"
          name="email"
          ref={register(emailValidator)}
          type="email"
          width="45ch"
        />
      </Formgroup>
      <Formgroup
        controlId="login-form_password"
        label="Your Password"
        error={errors.password?.message?.toString()}
      >
        <TextInput
          id="login-form_password"
          dataTestId="login-form_password"
          name="password"
          ref={register(passwordValidator)}
          type="password"
          width="45ch"
        />
      </Formgroup>
      <Link
        dataTestId="forgot-password"
        dataUiTestId="login-form-forgot-password"
        href="/account/password-request"
        color="teal"
      >
        Problems Logging In?
      </Link>
      <Button
        dataTestId="login-form_submit"
        type="submit"
        label={isSubmitting ? 'Loading...' : 'Login'}
        disabled={isSubmitting}
        icon={<ChevronForwardSharp />}
        iconColor="white"
        iconPosition="after"
        color="primary"
      />
    </Form>
  );
};

export default LoginForm;
