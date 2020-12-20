import React from 'react';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import FormError from '@vanarama/uibook/lib/components/organisms/form/FormError';
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
