import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import localForage from 'localforage';
import { useRouter } from 'next/router';
import {
  LoginUserMutation,
  LoginUserMutationVariables,
} from '../../../generated/LoginUserMutation';
import LoginForm from '../../components/LoginForm/LoginForm';

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUserMutation($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const LoginFormContainer: React.FC = () => {
  const router = useRouter();
  // TODO: Handle error from mutation
  const [loginUser, { loading }] = useMutation<
    LoginUserMutation,
    LoginUserMutationVariables
  >(LOGIN_USER_MUTATION);

  return (
    <LoginForm
      isSubmitting={loading}
      onSubmit={async values => {
        const response = await loginUser({
          variables: {
            username: values.email,
            password: values.password,
          },
        });

        const token = response.data.login;
        await localForage.setItem('token', token);

        // Redirect to the user's previous route or homepage.
        const { redirect } = router.query;
        const nextUrl =
          typeof redirect === 'string' && redirect !== '/_error'
            ? redirect
            : '/';

        router.push(nextUrl);
      }}
    />
  );
};

export default LoginFormContainer;
