import React from 'react';
import dynamic from 'next/dynamic';
import TextInput from 'core/atoms/textinput';
import { useForm, FormContext as FormProvider } from 'react-hook-form';
import PasswordRequirements from '../../core/components/PasswordRequirements';
import {
  TermsAndConditions,
  Consent,
  PrivacyPolicy,
} from '../FormGenericCheckboxes/FormGenericCheckboxes';
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
  const methods = useForm<IRegisterFormValues>({
    mode: 'onBlur',
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const watchPassword = methods.watch('password');

  return (
    <FormProvider {...methods}>
      <Form
        dataTestId="register-form"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Formgroup
          controlId="register-form_firstName"
          label="First Name"
          error={methods.errors.firstName?.message?.toString()}
        >
          <TextInput
            id="register-form_firstName"
            dataTestId="register-form_firstName"
            name="firstName"
            ref={methods.register(firstNameValidator)}
            type="text"
            width="45ch"
          />
        </Formgroup>
        <Formgroup
          controlId="register-form_lastName"
          label="Last Name"
          error={methods.errors.lastName?.message?.toString()}
        >
          <TextInput
            id="register-form_lastName"
            dataTestId="register-form_lastName"
            name="lastName"
            ref={methods.register(lastNameValidator)}
            type="text"
            width="45ch"
          />
        </Formgroup>
        <Formgroup
          controlId="register-form_email"
          label="Your Email"
          error={methods.errors.email?.message?.toString()}
        >
          <TextInput
            id="register-form_email"
            dataTestId="register-form_email"
            name="email"
            ref={methods.register({
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
          error={methods.errors.password?.message?.toString()}
        >
          <TextInput
            autoComplete="new-password"
            id="register-form_password"
            dataTestId="register-form_password"
            name="password"
            ref={methods.register(passwordValidator)}
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
          error={methods.errors.confirmPassword?.message?.toString()}
        >
          <TextInput
            autoComplete="repeat-password"
            id="register-form_confirm-password"
            dataTestId="register-form_confirm-password"
            name="confirmPassword"
            ref={methods.register(confirmPasswordValidator(watchPassword))}
            type="password"
            width="45ch"
          />
        </Formgroup>

        <Formgroup
          error={
            methods.errors?.termsAndCons?.message?.toString() ||
            methods.errors?.privacyPolicy?.message?.toString()
          }
        >
          <TermsAndConditions id="register-form-terms" />
          <PrivacyPolicy id="register-form-privacy-policy" />
          <Consent id="register-form-consent" />
        </Formgroup>

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
    </FormProvider>
  );
};

export default RegisterForm;
