import ChevronForwardSharpIcon from '@vanarama/uibook/packages/ui-components/src/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/packages/ui-components/src/components/atoms/button';
import Link from '@vanarama/uibook/packages/ui-components/src/components/atoms/link';
import TextInput from '@vanarama/uibook/packages/ui-components/src/components/atoms/textinput';
import NextLink from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { ILoginFormProps, ILoginFormValues } from './interfaces';
import { emailValidator, passwordValidator } from './LoginForm.validate';

const LoginForm: React.FC<ILoginFormProps> = ({ isSubmitting, onSubmit }) => {
  const { handleSubmit, errors, control } = useForm<ILoginFormValues>();
  return (
    <form id="loginForm" className="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        id="loginFormInputEmail"
        name="email"
        type="email"
        as={TextInput}
        control={control}
        label="Your Email"
        invalid={errors.email && errors.email.message}
        rules={emailValidator}
      />
      <Controller
        id="loginFormInputPassword"
        name="password"
        type="password"
        as={TextInput}
        control={control}
        invalid={errors.password && errors.password.message}
        label="Your Password"
        rules={passwordValidator}
      />
      {/* TODO: Make Link work with next/link */}
      {/* <NextLink href="/password-reset" passHref> */}
      <Link href="/password-reset" color="teal">
        Forgotten your Password?
      </Link>
      {/* </NextLink> */}
      <Button
        id="loginFormButton"
        type="submit"
        label={isSubmitting ? 'Loading...' : 'Login'}
        disabled={isSubmitting}
        icon={isSubmitting ? undefined : <ChevronForwardSharpIcon />}
        iconPosition="after"
        color="primary"
      />
    </form>
  );
};

export default LoginForm;
