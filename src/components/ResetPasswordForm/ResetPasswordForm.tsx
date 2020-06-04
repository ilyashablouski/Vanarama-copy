import React from 'react';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
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

const PasswordResetContainer = ({
  hasError: error,
  isSubmitting,
  username = '',
  onSubmit,
}: IResetPasswordFormProps) => {
  const { handleSubmit, errors, watch, register } = useForm<
    IResetPasswordFormValues
  >({
    mode: 'onBlur',
    defaultValues: {
      confirmPass: '',
      code: '',
      password: '',
    },
  });
  const watchPassword = watch('password');
  const onHandleSubmit = (data: IResetPasswordFormValues) =>
    onSubmit({ ...data, username: username || '' });
  return (
    <Form
      dataTestId="password-reset-form"
      invalid={error}
      onSubmit={handleSubmit(onHandleSubmit)}
    >
      {error && (
        <FormError dataTestId="login-form_error">
          Please request a verification code again
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
          ref={register(requiredField('Your Verification сode is required'))}
        />
      </Formgroup>
      <Formgroup
        controlId="password-reset-form_new-pass"
        label="Create New Password"
        error={errors.password?.message?.toString()}
      >
        <TextInput
          id="password-reset-form_new-pass"
          dataTestId="password-reset-form_new-pass"
          name="password"
          ref={register(passwordValidator)}
          type="password"
        />
      </Formgroup>
      <Details summary="Password Requirements">
        <PasswordRequirements />
      </Details>
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
        label={isSubmitting ? 'Loading...' : 'Save New Password'}
        disabled={isSubmitting}
        color="primary"
      />
    </Form>
  );
};

export default PasswordResetContainer;
