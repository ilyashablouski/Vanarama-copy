import {
  LoginMutation,
  LoginMutationVariables,
} from '../../../../generated/LoginMutation';
import {
  RegisterMutation,
  RegisterMutationVariables,
} from '../../../../generated/RegisterMutation';
import { apolloClient } from '../apolloClient';
import { LOGIN, REGISTER } from './gql';

export const login = (email: string, password: string) => {
  return apolloClient.mutate<LoginMutation, LoginMutationVariables>({
    mutation: LOGIN,
    variables: { email, pw: password },
  });
};

export const register = (email: string, password: string) => {
  return apolloClient.mutate<RegisterMutation, RegisterMutationVariables>({
    mutation: REGISTER,
    variables: { email, pw: password },
  });
};
