import { useMutation } from '@apollo/react-hooks';
import Button from '@vanarama/uibook/src/components/atoms/button';
import Details from '@vanarama/uibook/src/components/atoms/details';
import Text from '@vanarama/uibook/src/components/atoms/text';
import TextInput from '@vanarama/uibook/src/components/atoms/textinput';
import Formgroup from '@vanarama/uibook/src/components/molecules/formgroup';
import { gql } from 'apollo-boost';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  RegisterUser,
  RegisterUserVariables,
} from '../../../generated/RegisterUser';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/regex';

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
          invalid={errors.email && errors.email.message}
          rules={{
            required: {
              value: true,
              message: 'Your Email is required',
            },
            pattern: {
              value: EMAIL_REGEX,
              message: 'Invalid email address',
            },
          }}
        />
      </Formgroup>
      <Formgroup>
        <Controller
          name="password"
          type="password"
          as={TextInput}
          control={control}
          invalid={errors.password && errors.password.message}
          label="Your Password"
          rules={{
            required: {
              value: true,
              message: 'Your Password is required',
            },
            pattern: {
              value: PASSWORD_REGEX,
              message: 'Your Password does not meet the requirements',
            },
          }}
        />
      </Formgroup>
      <Details
        summary="Password Requirements"
        content="Must be 8 characters long, contain at least 1 number, contain uppercase letters and contain lowercase letters."
      />
      <Formgroup>
        <Controller
          name="confirmPassword"
          type="password"
          as={TextInput}
          control={control}
          invalid={errors.confirmPassword && errors.confirmPassword.message}
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
      </Formgroup>
      <Text tag="p" color="darker" size="xsmall">
        Terms and conditions agreement text and link
      </Text>
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
