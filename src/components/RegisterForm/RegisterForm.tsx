import { useMutation } from '@apollo/react-hooks';
import ChevronForwardSharpIcon from '@vanarama/uibook/packages/ui-components/src/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/packages/ui-components/src/components/atoms/button';
import Details from '@vanarama/uibook/packages/ui-components/src/components/atoms/details';
import Link from '@vanarama/uibook/packages/ui-components/src/components/atoms/link';
import Text from '@vanarama/uibook/packages/ui-components/src/components/atoms/text';
import TextInput from '@vanarama/uibook/packages/ui-components/src/components/atoms/textinput';
import { gql } from 'apollo-boost';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  RegisterUserMutation,
  RegisterUserMutationVariables,
} from '../../../generated/RegisterUserMutation';
import {
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
} from './RegisterForm.validate';

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUserMutation($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      # TODO: Update once register changed to return a boolean
      id
    }
  }
`;

interface IProps {
  onSuccess: () => void;
}

interface IFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC<IProps> = ({ onSuccess }) => {
  const { handleSubmit, errors, control, watch, reset } = useForm<
    IFormValues
  >();

  // TODO: Handle error from mutation
  const [registerUser, { loading }] = useMutation<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >(REGISTER_USER_MUTATION);

  const onSubmit = async (values: IFormValues) => {
    await registerUser({
      variables: {
        username: values.email,
        password: values.password,
      },
    });

    onSuccess();
    reset();
  };

  return (
    <form id="register-form" className="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        id="email"
        name="email"
        type="email"
        as={TextInput}
        control={control}
        label="Your Email"
        invalid={errors.email && errors.email.message}
        rules={emailValidator}
      />
      <Controller
        id="password"
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
        id="confirmPassword"
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
          name="submit"
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
