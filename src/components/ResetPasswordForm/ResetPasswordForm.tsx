import React from 'react';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import FormError from '@vanarama/uibook/lib/components/organisms/form/FormError';
import { useForm } from 'react-hook-form';
import Details from '@vanarama/uibook/lib/components/atoms/details';
import {
  IResetPasswordFormValues,
  IResetPasswordFormProps,
} from './interfaces';
import {
  requiredField,
  confirmPasswordValidator,
  passwordValidator,
} from '../../utils/inputValidators';
import PasswordRequirements from '../../core/components/PasswordRequirements';
import RouterLink from '../RouterLink/RouterLink';

const resetPasswordLink = {
  href: '/account/password-request',
  label: '',
};

const PasswordResetContainer = ({
  hasError: error,
  isSubmitting,
  username,
  code,
  onSubmit,
  oldPassword,
}: IResetPasswordFormProps) => {
  const { handleSubmit, errors, watch, register } = useForm<
    IResetPasswordFormValues
  >({
    mode: 'onBlur',
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
              width={23}
            />
          </Formgroup>
        </>
      ) : (
        <>
          {error && (
            <FormError dataTestId="login-form_error">
              {'Your old password seems incorrect. '}
              <RouterLink dataTestId="forgot-password" link={resetPasswordLink}>
                <Text tag="span" color="teal" size="small">
                  Reset your password here
                </Text>
              </RouterLink>
            </FormError>
          )}
          <Formgroup
            controlId="password-reset-form_code"
            label="Old Password"
            error={errors.code?.message?.toString()}
          >
            <TextInput
              id="password-reset-form_code"
              dataTestId="password-reset-form_code"
              name="code"
              type="password"
              ref={register(requiredField('Please fill in your Old Password'))}
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
          ref={register(passwordValidator)}
          type="password"
          width="30ch"
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
          width="30ch"
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
