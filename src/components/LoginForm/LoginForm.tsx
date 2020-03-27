import { useMutation } from '@apollo/react-hooks';
import ChevronForwardSharpIcon from '@vanarama/uibook/packages/ui-components/src/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/packages/ui-components/src/components/atoms/button';
import Link from '@vanarama/uibook/packages/ui-components/src/components/atoms/link';
import TextInput from '@vanarama/uibook/packages/ui-components/src/components/atoms/textinput';
import { gql } from 'apollo-boost';
import localForage from 'localforage';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import {
  LoginUserMutation,
  LoginUserMutationVariables,
} from '../../../generated/LoginUserMutation';
import { ILoginFormValues } from './interfaces';
import { emailValidator, passwordValidator } from './LoginForm.validate';

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUserMutation($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { handleSubmit, errors, control } = useForm<ILoginFormValues>();

  // TODO: Handle error from mutation
  const [loginUser, { loading }] = useMutation<
    LoginUserMutation,
    LoginUserMutationVariables
  >(LOGIN_USER_MUTATION);

  const onSubmit = async (values: ILoginFormValues) => {
    const response = await loginUser({
      variables: {
        username: values.email,
        password: values.password,
      },
    });

    await localForage.setItem('token', response.data.login);
    router.push('/');
  };

  return (
    <form id="loginForm" className="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        id="loginFormInputEmail"
        name="email"
        type="email"
        as={TextInput}
        control={control}
        label="Your Email"
        invalid={errors.email && errors.email.message}
        rules={emailValidator}
      />
      <Controller
        id="loginFormInputPassword"
        name="password"
        type="password"
        as={TextInput}
        control={control}
        invalid={errors.password && errors.password.message}
        label="Your Password"
        rules={passwordValidator}
      />
      {/* TODO: This should really be next/link. We need to determine how this would work */}
      <Link href="/password-reset" color="teal">
        Forgotten your Password?
      </Link>
      <Button
        id="loginFormButton"
        type="submit"
        label={loading ? 'Loading...' : 'Login'}
        disabled={loading}
        icon={loading ? undefined : <ChevronForwardSharpIcon />}
        iconPosition="after"
        color="primary"
      />
    </form>
  );
};

export default LoginForm;
