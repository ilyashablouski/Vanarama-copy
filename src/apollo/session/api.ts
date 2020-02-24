import { client } from '../apollo';
import { LOGIN_USER } from './gql';

export const loginUser = async (email: string, pword: string) => {
  return await client.mutate({
    mutation: LOGIN_USER,
    variables: { email: email, pw: pword },
  });
};
