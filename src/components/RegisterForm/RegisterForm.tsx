import ChevronForwardSharpIcon from '@vanarama/uibook/packages/ui-components/src/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/packages/ui-components/src/components/atoms/button';
import Details from '@vanarama/uibook/packages/ui-components/src/components/atoms/details';
import Link from '@vanarama/uibook/packages/ui-components/src/components/atoms/link';
import Text from '@vanarama/uibook/packages/ui-components/src/components/atoms/text';
import TextInput from '@vanarama/uibook/packages/ui-components/src/components/atoms/textinput';
import Form from '@vanarama/uibook/packages/ui-components/src/components/organisms/form';
import { useForm } from 'react-hook-form';
import { IRegisterFormProps, IRegisterFormValues } from './interfaces';
import {
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
} from './RegisterForm.validate';

const RegisterForm: React.FC<IRegisterFormProps> = ({
  isSubmitting,
  onSubmit,
}) => {
  const { handleSubmit, errors, watch, register } = useForm<
    IRegisterFormValues
  >({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
  });

  const watchPassword = watch('password');
  return (
    <Form
      data-testid="register-form"
      className="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        id="register-form_email"
        name="email"
        type="email"
        label="Your Email"
        invalid={errors.email && errors.email.message}
        data-testid="register-form_email"
        errorProps={{ 'data-testid': 'register-form_email-error' }}
        parentRef={register(emailValidator)}
      />
      <TextInput
        id="register-form_password"
        name="password"
        type="password"
        invalid={errors.password && errors.password.message}
        label="Your Password"
        data-testid="register-form_password"
        errorProps={{ 'data-testid': 'register-form_password-error' }}
        parentRef={register(passwordValidator)}
      />
      <Details
        summary="Password Requirements"
        content="Must be 8 characters long, contain at least 1 number, contain uppercase letters and contain lowercase letters."
      />
      <TextInput
        id="register-form_confirmPassword"
        name="confirmPassword"
        type="password"
        invalid={errors.confirmPassword && errors.confirmPassword.message}
        label="Repeat Password"
        data-testid="register-form_confirm-password"
        errorProps={{ 'data-testid': 'register-form_confirm-password-error' }}
        parentRef={register(confirmPasswordValidator(watchPassword))}
      />
      <Text tag="p" color="darker" size="xsmall">
        By creating your account, you agree to our{' '}
        <Link
          data-testid="terms_and_conditions"
          href="https://www.motorama.com/terms-conditions"
          size="xsmall"
        >
          Terms and Conditions
        </Link>{' '}
        and{' '}
        <Link
          data-testid="privacy_policy"
          href="https://www.motorama.com/cookie-privacy-policy"
          size="xsmall"
        >
          Privacy Policy
        </Link>
        .
      </Text>
      <Button
        data-testid="register-form_submit"
        type="submit"
        label={isSubmitting ? 'Loading...' : 'Register'}
        disabled={isSubmitting}
        icon={isSubmitting ? undefined : <ChevronForwardSharpIcon />}
        iconPosition="after"
        color="primary"
      />
    </Form>
  );
};

export default RegisterForm;
