import { apolloClient } from '../apolloClient';
import { LOGIN, REGISTER } from './gql';

export const login = (email: string, password: string) => {
  return apolloClient.mutate({
    mutation: LOGIN,
    variables: { email, pw: password },
  });
};

export const register = (email: string, password: string) => {
  return apolloClient.mutate({
    mutation: REGISTER,
    variables: { email, pw: password },
  });
};
