import ChevronForwardSharpIcon from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import FormError from '@vanarama/uibook/lib/components/organisms/form/FormError';
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
      dataTestId="login-form"
      className="form"
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
        error={errors.email?.message}
      >
        <TextInput
          id="login-form_email"
          dataTestId="login-form_email"
          name="email"
          ref={register(emailValidator)}
          type="email"
          width={45}
        />
      </Formgroup>
      <Formgroup
        controlId="login-form_password"
        label="Your Password"
        error={errors.password?.message}
      >
        <TextInput
          id="login-form_password"
          dataTestId="login-form_password"
          name="password"
          ref={register(passwordValidator)}
          type="password"
          width={45}
        />
      </Formgroup>
      {/* TODO: Make Link work with next/link */}
      {/* <NextLink href="/password-reset" passHref> */}
      <Link dataTestId="forgot-password" href="/password-reset" color="teal">
        Forgotten your Password?
      </Link>
      {/* </NextLink> */}
      <Button
        dataTestId="login-form_submit"
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
