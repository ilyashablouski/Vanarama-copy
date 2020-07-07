import { gql, useMutation } from '@apollo/client';
import {
  LoginUserMutation as Mutation,
  LoginUserMutationVariables as MutationVariables,
} from '../../../generated/LoginUserMutation';
import LoginForm from '../../components/LoginForm/LoginForm';
import { ILogInFormContainerProps } from './interfaces';

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUserMutation($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const LoginFormContainer = ({ onCompleted }: ILogInFormContainerProps) => {
  const [login, { loading, error }] = useMutation<Mutation, MutationVariables>(
    LOGIN_USER_MUTATION,
    { onCompleted },
  );

  return (
    <LoginForm
      hasError={Boolean(error)}
      isSubmitting={loading}
      onSubmit={async values => {
        await login({
          variables: {
            username: values.email,
            password: values.password,
          },
        });
      }}
    />
  );
};

export default LoginFormContainer;
