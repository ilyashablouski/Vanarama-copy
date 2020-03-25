import { useMutation } from '@apollo/react-hooks';
import Button from '@vanarama/uibook/src/components/atoms/button';
import TextInput from '@vanarama/uibook/src/components/atoms/textinput';
import Formgroup from '@vanarama/uibook/src/components/molecules/formgroup';
import { gql } from 'apollo-boost';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  RegisterUser,
  RegisterUserVariables,
} from '../../../generated/RegisterUser';

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
      <Formgroup>
        <Controller
          name="email"
          type="email"
          as={TextInput}
          control={control}
          label="Your Email"
          rules={{
            required: {
              value: true,
              message: 'Your Email is required',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address',
            },
          }}
        />
        {errors.email && errors.email.message}
      </Formgroup>
      <Formgroup>
        <Controller
          name="password"
          type="password"
          as={TextInput}
          control={control}
          label="Your Password"
          rules={{
            required: {
              value: true,
              message: 'Your Password is required',
            },
          }}
        />
        {errors.password && errors.password.message}
      </Formgroup>
      <Formgroup>
        <Controller
          name="confirmPassword"
          type="password"
          as={TextInput}
          control={control}
          label="Repeat Password"
          rules={{
            validate: value => {
              return watch('password') !== value
                ? 'Repeat Password does not match'
                : null;
            },
            required: {
              value: true,
              message: 'Repeat Password is required',
            },
          }}
        />
        {errors.confirmPassword && errors.confirmPassword.message}
      </Formgroup>
      <Formgroup>
        {loading ? (
          <Button type="submit" label="Loading..." disabled color="primary" />
        ) : (
          <Button type="submit" label="Register" color="primary" />
        )}
      </Formgroup>
    </form>
  );
};

export default RegisterForm;
