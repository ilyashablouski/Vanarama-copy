import ChevronForwardSharpIcon from '@vanarama/uibook/packages/ui-components/src/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/packages/ui-components/src/components/atoms/button';
import Link from '@vanarama/uibook/packages/ui-components/src/components/atoms/link';
import TextInput from '@vanarama/uibook/packages/ui-components/src/components/atoms/textinput';
import Form from '@vanarama/uibook/packages/ui-components/src/components/organisms/form';
import FormError from '@vanarama/uibook/packages/ui-components/src/components/organisms/form/FormError';
import { useForm } from 'react-hook-form';
import { ILoginFormProps, ILoginFormValues } from './interfaces';
import { emailValidator, passwordValidator } from './LoginForm.validate';

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
      data-testid="login-form"
      className="form"
      invalid={error}
      onSubmit={handleSubmit(onSubmit)}
    >
      {error && (
        <FormError data-testid="login-form_error">
          Email address and password combination is not valid
        </FormError>
      )}
      <TextInput
        id="login-form_email"
        name="email"
        type="email"
        label="Your Email"
        invalid={errors.email && errors.email.message}
        data-testid="login-form_email"
        errorProps={{ 'data-testid': 'login-form_email-error' }}
        parentRef={register(emailValidator)}
      />
      <TextInput
        id="login-form_password"
        name="password"
        type="password"
        invalid={errors.password && errors.password.message}
        label="Your Password"
        data-testid="login-form_password"
        errorProps={{ 'data-testid': 'login-form_password-error' }}
        parentRef={register(passwordValidator)}
      />
      {/* TODO: Make Link work with next/link */}
      {/* <NextLink href="/password-reset" passHref> */}
      <Link data-testid="forgot-password" href="/password-reset" color="teal">
        Forgotten your Password?
      </Link>
      {/* </NextLink> */}
      <Button
        data-testid="login-form_submit"
        type="submit"
        label={isSubmitting ? 'Loading...' : 'Login'}
        disabled={isSubmitting}
        icon={isSubmitting ? undefined : <ChevronForwardSharpIcon />}
        iconPosition="after"
        color="primary"
      />
    </Form>
  );
};

export default LoginForm;
