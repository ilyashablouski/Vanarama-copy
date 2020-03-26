import { useMutation } from '@apollo/react-hooks';
import ChevronForwardSharpIcon from '@vanarama/uibook/src/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/src/components/atoms/button';
import Details from '@vanarama/uibook/src/components/atoms/details';
import Link from '@vanarama/uibook/src/components/atoms/link';
import Text from '@vanarama/uibook/src/components/atoms/text';
import TextInput from '@vanarama/uibook/src/components/atoms/textinput';
import { gql } from 'apollo-boost';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  RegisterUser,
  RegisterUserVariables,
} from '../../../generated/RegisterUser';
import {
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
} from './RegisterForm.validate';

const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      # TODO: Update once register changed to return a boolean
      id
    }
  }
`;

interface IFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const { handleSubmit, errors, control, watch } = useForm<IFormValues>();

  // TODO: Handle error from mutation
  const [registerUser, { loading }] = useMutation<
    RegisterUser,
    RegisterUserVariables
  >(REGISTER_USER);

  const onSubmit = async (values: IFormValues) => {
    await registerUser({
      variables: {
        username: values.email,
        password: values.password,
      },
    });

    // TODO: Show a success toast
    alert('Registration successful');
  };

  return (
    <form id="register-form" className="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        type="email"
        as={TextInput}
        control={control}
        label="Your Email"
        invalid={errors.email && errors.email.message}
        rules={emailValidator}
      />
      <Controller
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
      {loading ? (
        <Button type="submit" label="Loading..." disabled color="primary" />
      ) : (
        <Button
          type="submit"
          label="Register"
          icon={<ChevronForwardSharpIcon />}
          iconPosition="after"
          color="primary"
        />
      )}
    </form>
  );
};

export default RegisterForm;
