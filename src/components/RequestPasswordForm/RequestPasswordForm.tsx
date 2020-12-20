import React from 'react';
import ArrowForwardSharp from 'core/assets/icons/ArrowForwardSharp';
import Button from 'core/atoms/button';
import TextInput from 'core/atoms/textinput';
import Formgroup from 'core/molecules/formgroup';
import Form from 'core/organisms/form';
import FormError from 'core/organisms/form/FormError';
import { useForm } from 'react-hook-form';
import {
  IRequestPasswordFormValues,
  IRequestPasswordFormProps,
} from './interfaces';
import { requiredField } from '../../utils/inputValidators';

const RequestPasswordForm = ({
  hasError: error,
  isSubmitting,
  onSubmit,
}: IRequestPasswordFormProps) => {
  const { handleSubmit, errors, register } = useForm<
    IRequestPasswordFormValues
  >({
    defaultValues: {
      email: '',
    },
  });
  return (
    <Form
      dataTestId="password-request-form"
      invalid={error}
      onSubmit={handleSubmit(onSubmit)}
    >
      {error && (
        <FormError dataTestId="login-form_error">
          Sorry we do not recognise this email address
        </FormError>
      )}
      <Formgroup
        controlId="password-request-form_email"
        label="Email"
        error={errors.email?.message?.toString()}
      >
        <TextInput
          id="password-request-form_email"
          dataTestId="password-request-form_email"
          name="email"
          ref={register(requiredField('Your Email is required'))}
          type="email"
          width="30ch"
        />
      </Formgroup>
      <Button
        dataTestId="password-request-form_submit"
        type="submit"
        label={isSubmitting ? 'Loading...' : 'Reset Password'}
        disabled={isSubmitting}
        icon={<ArrowForwardSharp />}
        iconColor="white"
        iconPosition="after"
        color="primary"
      />
    </Form>
  );
};

export default RequestPasswordForm;
