import ChevronForwardSharpIcon from '@vanarama/uibook/packages/ui-components/src/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/packages/ui-components/src/components/atoms/button';
import Link from '@vanarama/uibook/packages/ui-components/src/components/atoms/link';
import TextInput from '@vanarama/uibook/packages/ui-components/src/components/atoms/textinput';
import { useForm } from 'react-hook-form';
import { ILoginFormProps, ILoginFormValues } from './interfaces';
import { emailValidator, passwordValidator } from './LoginForm.validate';

const LoginForm: React.FC<ILoginFormProps> = ({ isSubmitting, onSubmit }) => {
  const { handleSubmit, errors, register } = useForm<ILoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form
      data-testid="login-form"
      className="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        id="login-form_email"
        name="email"
        type="email"
        label="Your Email"
        invalid={errors.email && errors.email.message}
        testId="login-form_email"
        errorTestId="login-form_email-error"
        parentRef={register(emailValidator)}
      />
      <TextInput
        id="login-form_password"
        name="password"
        type="password"
        invalid={errors.password && errors.password.message}
        label="Your Password"
        testId="login-form_password"
        errorTestId="login-form_password-error"
        parentRef={register(passwordValidator)}
      />
      {/* TODO: Make Link work with next/link */}
      {/* <NextLink href="/password-reset" passHref> */}
      <Link testId="forgot-password" href="/password-reset" color="teal">
        Forgotten your Password?
      </Link>
      {/* </NextLink> */}
      <Button
        testId="login-form_submit"
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
