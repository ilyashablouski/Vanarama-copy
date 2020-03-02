import { apolloClient } from '../apolloClient';
import { LOGIN } from './gql';

export const login = (email: string, password: string) => {
  return apolloClient.mutate({
    mutation: LOGIN,
    variables: { email, pw: password },
  });
};
