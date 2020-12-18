import dynamic from 'next/dynamic';
import TextInput from 'core/atoms/textinput';
import { useForm } from 'react-hook-form';
import PasswordRequirements from '../../core/components/PasswordRequirements';
import {
  confirmPasswordValidator,
  passwordValidator,
  lastNameValidator,
  firstNameValidator,
} from '../../utils/inputValidators';
import { EMAIL_REGEX } from '../../utils/regex';
import { IRegisterFormProps, IRegisterFormValues } from './interfaces';
import Skeleton from '../Skeleton';

const Details = dynamic(() => import('core/atoms/details'), {
  loading: () => <Skeleton count={1} />,
});
const Link = dynamic(() => import('core/atoms/link'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button/'), {
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
const Formgroup = dynamic(() => import('core/molecules/formgroup'), {
  loading: () => <Skeleton count={5} />,
});

const RegisterForm: React.FC<IRegisterFormProps> = ({
  isSubmitting,
  onSubmit,
  onCheckEmailExists,
}) => {
  const { handleSubmit, errors, watch, register } = useForm<
    IRegisterFormValues
  >({
    mode: 'onBlur',
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const watchPassword = watch('password');

  return (
    <Form dataTestId="register-form" onSubmit={handleSubmit(onSubmit)}>
      <Formgroup
        controlId="register-form_firstName"
        label="First Name"
        error={errors.firstName?.message?.toString()}
      >
        <TextInput
          id="register-form_firstName"
          dataTestId="register-form_firstName"
          name="firstName"
          ref={register(firstNameValidator)}
          type="text"
          width="45ch"
        />
      </Formgroup>
      <Formgroup
        controlId="register-form_lastName"
        label="Last Name"
        error={errors.lastName?.message?.toString()}
      >
        <TextInput
          id="register-form_lastName"
          dataTestId="register-form_lastName"
          name="lastName"
          ref={register(lastNameValidator)}
          type="text"
          width="45ch"
        />
      </Formgroup>
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
            validate: async value =>
              (await onCheckEmailExists(value))
                ? 'This email address already exists. Please log in'
                : undefined,
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
          width="45ch"
        />
      </Formgroup>
      <Details summary="Password Requirements">
        <PasswordRequirements />
      </Details>
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
          width="45ch"
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
