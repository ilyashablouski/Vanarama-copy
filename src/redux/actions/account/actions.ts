import { client } from '../../../lib/apollo';
import { PASSWORD_REQUEST_GQL, PASSWORD_RESET_GQL } from '../../../gql/account';
import { PASSWORD_REQUEST, PASSWORD_RESET } from './types';

export const passwordRequest = (email: string) => {
  return async (dispatch: any) => {
    await client.mutate({
      mutation: PASSWORD_REQUEST_GQL,
      variables: { email },
    });
    dispatch({
      type: PASSWORD_REQUEST,
      payload: { success: true },
    });
  };
};

export const passwordReset = (verificationCode: string, password: string) => {
  return async (dispatch: any) => {
    await client.mutate({
      mutation: PASSWORD_RESET_GQL,
      variables: { verificationCode, password },
    });
    dispatch({
      type: PASSWORD_RESET,
      payload: { success: true },
    });
  };
};
