import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Details from '@vanarama/uibook/lib/components/atoms/details';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { useForm } from 'react-hook-form';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import { IRegisterFormProps, IRegisterFormValues } from './interfaces';
import {
  confirmPasswordValidator,
  passwordValidator,
} from './RegisterForm.validate';
import { EMAIL_REGEX } from '../../utils/regex';

const RegisterForm: React.FC<IRegisterFormProps> = ({
  isSubmitting,
  onSubmit,
  onEmailAlreadyExists,
}) => {
  const { handleSubmit, errors, watch, register } = useForm<
    IRegisterFormValues
  >({
    mode: 'onBlur',
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
  });

  const watchPassword = watch('password');

  return (
    <Form
      dataTestId="register-form"
      className="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Formgroup
        controlId="register-form_email"
        label="Your Email"
        error={errors.email?.message?.toString()}
      >
        <TextInput
          id="register-form_email"
          dataTestId="register-form_email"
          name="email"
          ref={register({
            required: {
              value: true,
              message: 'Your Email is required',
            },
            pattern: {
              value: EMAIL_REGEX,
              message: 'Invalid email address',
            },
            validate: async value => {
              const results = await onEmailAlreadyExists({
                variables: { email: value },
              });
              const emailAlreadyExists = results?.data?.emailAlreadyExists
                ? 'Email Already Exists'
                : undefined;

              return emailAlreadyExists;
            },
          })}
          type="text"
        />
      </Formgroup>
      <Formgroup
        controlId="register-form_password"
        label="Your Password"
        error={errors.password?.message?.toString()}
      >
        <TextInput
          id="register-form_password"
          dataTestId="register-form_password"
          name="password"
          ref={register(passwordValidator)}
          type="password"
          width={45}
        />
      </Formgroup>
      <Details
        summary="Password Requirements"
        content="Must be 8 characters long, contain at least 1 number, contain uppercase letters and contain lowercase letters."
      />
      <Formgroup
        controlId="register-form_confirm-password"
        label="Repeat Password"
        error={errors.confirmPassword?.message?.toString()}
      >
        <TextInput
          id="register-form_confirm-password"
          dataTestId="register-form_confirm-password"
          name="confirmPassword"
          ref={register(confirmPasswordValidator(watchPassword))}
          type="password"
          width={45}
        />
      </Formgroup>

      <Text tag="p" color="darker" size="xsmall">
        By creating your account, you agree to our{' '}
        <Link
          dataTestId="terms_and_conditions"
          href="https://www.motorama.com/terms-conditions"
          size="xsmall"
        >
          Terms and Conditions
        </Link>{' '}
        and{' '}
        <Link
          dataTestId="privacy_policy"
          href="https://www.motorama.com/cookie-privacy-policy"
          size="xsmall"
        >
          Privacy Policy
        </Link>
        .
      </Text>
      <Button
        dataTestId="register-form_submit"
        type="submit"
        label={isSubmitting ? 'Loading...' : 'Register'}
        disabled={isSubmitting}
        icon={<ChevronForwardSharp />}
        iconColor="white"
        iconPosition="after"
        color="primary"
      />
    </Form>
  );
};

export default RegisterForm;
