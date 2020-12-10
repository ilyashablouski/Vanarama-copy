import React from 'react';
import dynamic from 'next/dynamic';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import { useForm } from 'react-hook-form';
import Details from '@vanarama/uibook/lib/components/atoms/details';
import {
  IResetPasswordFormValues,
  IResetPasswordFormProps,
} from './interfaces';
import {
  requiredField,
  confirmPasswordValidator,
  newPasswordValidator,
} from '../../utils/inputValidators';
import PasswordRequirements from '../../core/components/PasswordRequirements';
import {
  mapOldPasswordErrorMessage,
  wrongPasswordError,
  WRONG_PASSWORD,
} from './mapOldPasswordErrorMessage';
import Skeleton from '../Skeleton';

const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button/'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text/'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const ArrowForwardSharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/ArrowForwardSharp'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Form = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/form'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const FormError = dynamic(
  () => import('@vanarama/uibook/lib/components/organisms/form/FormError'),
  {
    loading: () => <Skeleton count={5} />,
  },
);
const Formgroup = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/formgroup'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const PasswordResetContainer = ({
  hasError: error,
  isSubmitting,
  username,
  code,
  onSubmit,
  oldPassword,
  onPasswordValidation,
}: IResetPasswordFormProps) => {
  const { handleSubmit, errors, watch, register } = useForm<
    IResetPasswordFormValues
  >({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      code,
      password: '',
      confirmPass: '',
    },
  });

  const watchPassword = watch('password');
  const onHandleSubmit = (data: IResetPasswordFormValues) =>
    onSubmit({ ...data, username: username || '' });
  const resetTypeLabel = oldPassword ? 'Save New Password' : 'Submit';
  const resetPasswordButtonLabel = isSubmitting ? 'Loading...' : resetTypeLabel;

  return (
    <Form
      dataTestId="password-reset-form"
      invalid={error}
      onSubmit={handleSubmit(onHandleSubmit)}
    >
      {!oldPassword ? (
        <>
          {error && (
            <FormError dataTestId="login-form_error">
              Please request a verification code again
            </FormError>
          )}
          <Formgroup
            controlId="password-reset-form_code"
            label="Verification Code"
            error={errors.code?.message?.toString()}
          >
            <TextInput
              id="password-reset-form_code"
              dataTestId="password-reset-form_code"
              name="code"
              ref={register(
                requiredField('Your Verification сode is required'),
              )}
            />
          </Formgroup>
        </>
      ) : (
        <>
          {error && (
            <FormError dataTestId="login-form_error">
              {wrongPasswordError}
            </FormError>
          )}
          <Formgroup
            controlId="password-reset-form_code"
            label="Old Password"
            error={mapOldPasswordErrorMessage(errors.code?.message?.toString())}
          >
            <TextInput
              id="password-reset-form_code"
              dataTestId="password-reset-form_code"
              name="code"
              type="password"
              ref={register({
                ...requiredField('Please fill in your old password'),
                validate: async value =>
                  (await onPasswordValidation?.(value))
                    ? WRONG_PASSWORD
                    : undefined,
              })}
            />
          </Formgroup>
        </>
      )}
      <Formgroup
        controlId="password-reset-form_new-pass"
        label="New Password"
        error={errors.password?.message?.toString()}
      >
        <TextInput
          id="password-reset-form_new-pass"
          dataTestId="password-reset-form_new-pass"
          name="password"
          ref={register(newPasswordValidator)}
          type="password"
        />
      </Formgroup>
      {oldPassword ? (
        <Text size="small" color="dark">
          Must be 8 characters long, contain at least 1 number, contain
          uppercase letters and contain lowercase letters.
        </Text>
      ) : (
        <Details summary="Password Requirements">
          <PasswordRequirements />
        </Details>
      )}
      <Formgroup
        controlId="password-reset-form_confirm-pass"
        label="Repeat Password"
        error={errors.confirmPass?.message?.toString()}
      >
        <TextInput
          id="password-reset-form_confirm-pass"
          dataTestId="password-reset-form_confirm-pass"
          name="confirmPass"
          ref={register(confirmPasswordValidator(watchPassword))}
          type="password"
        />
      </Formgroup>
      <Button
        dataTestId="password-reset-form_submit"
        type="submit"
        label={resetPasswordButtonLabel}
        disabled={isSubmitting}
        icon={!oldPassword && <ArrowForwardSharp />}
        iconColor="white"
        iconPosition="after"
        color="primary"
      />
    </Form>
  );
};

export default PasswordResetContainer;
