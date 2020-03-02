
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actionTypes';
import { actionCreator } from '../../utils';
import { login as loginApi } from 'services/apollo/account/api';

export const login = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(actionCreator(LOGIN_REQUEST, email))

    try {
      const result = await loginApi(email, password);

      dispatch(actionCreator(LOGIN_SUCCESS, result.data.login))
    } catch (error) {
      dispatch(actionCreator(LOGIN_FAILURE, error))
    }
  };
};
