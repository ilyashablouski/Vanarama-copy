import ChevronForwardSharpIcon from '@vanarama/uibook/packages/ui-components/src/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/packages/ui-components/src/components/atoms/button';
import Details from '@vanarama/uibook/packages/ui-components/src/components/atoms/details';
import Link from '@vanarama/uibook/packages/ui-components/src/components/atoms/link';
import Text from '@vanarama/uibook/packages/ui-components/src/components/atoms/text';
import TextInput from '@vanarama/uibook/packages/ui-components/src/components/atoms/textinput';
import { Controller, useForm } from 'react-hook-form';
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
  const { handleSubmit, errors, control, watch } = useForm<
    IRegisterFormValues
  >();

  return (
    <form id="registerForm" className="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        id="registerFormInputEmail"
        name="email"
        type="email"
        as={TextInput}
        control={control}
        label="Your Email"
        invalid={errors.email && errors.email.message}
        rules={emailValidator}
      />
      <Controller
        id="registerFormInputPassword"
        name="password"
        type="password"
        as={TextInput}
        control={control}
        invalid={errors.password && errors.password.message}
        label="Your Password"
        rules={passwordValidator}
      />
      <Details
        summary="Password Requirements"
        content="Must be 8 characters long, contain at least 1 number, contain uppercase letters and contain lowercase letters."
      />
      <Controller
        id="registerFormInputConfirmPassword"
        name="confirmPassword"
        type="password"
        as={TextInput}
        control={control}
        invalid={errors.confirmPassword && errors.confirmPassword.message}
        label="Repeat Password"
        rules={confirmPasswordValidator(watch('password'))}
      />
      <Text tag="p" color="darker" size="xsmall">
        By creating your account, you agree to our{' '}
        <Link href="https://www.motorama.com/terms-conditions" size="xsmall">
          Terms and Conditions
        </Link>{' '}
        and{' '}
        <Link
          href="https://www.motorama.com/cookie-privacy-policy"
          size="xsmall"
        >
          Privacy Policy
        </Link>
        .
      </Text>
      <Button
        id="registerFormButton"
        type="submit"
        label={isSubmitting ? 'Loading...' : 'Register'}
        disabled={isSubmitting}
        icon={isSubmitting ? undefined : <ChevronForwardSharpIcon />}
        iconPosition="after"
        color="primary"
      />
    </form>
  );
};

export default RegisterForm;
