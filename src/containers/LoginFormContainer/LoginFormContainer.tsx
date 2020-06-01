import { gql, useMutation } from '@apollo/client';
import localForage from 'localforage';
import { useRouter } from 'next/router';
import {
  LoginUserMutation as Mutation,
  LoginUserMutationVariables as MutationVariables,
} from '../../../generated/LoginUserMutation';
import LoginForm from '../../components/LoginForm/LoginForm';

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUserMutation($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const LoginFormContainer: React.FC = () => {
  const router = useRouter();

  const [login, { loading, error }] = useMutation<Mutation, MutationVariables>(
    LOGIN_USER_MUTATION,
    {
      onCompleted: async data => {
        // Put the token in localStorage
        await localForage.setItem('token', data.login);

        // Redirect to the user's previous route or homepage.
        const { redirect } = router.query;
        const nextUrl =
          typeof redirect === 'string' && redirect !== '/_error'
            ? redirect
            : '/';

        router.push(nextUrl);
      },
    },
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
