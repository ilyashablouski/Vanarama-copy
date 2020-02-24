import { client } from '../../apollo';
import { LOGIN_USER } from './gql';

export const loginUser = async (email: string, pword: string) => {
  return client.mutate({
    mutation: LOGIN_USER,
    variables: { email: email, pw: pword },
  });
};

export const registerUser = async () => {
  return client.mutate({
    mutation: REGISTER_USER,
    variables: { email: email, pw: password },
  });
};
