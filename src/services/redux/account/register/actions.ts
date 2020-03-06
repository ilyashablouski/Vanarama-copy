
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../actionTypes';
import { actionCreator } from '../../utils';
import { register as registerApi } from 'services/apollo/account/api';

export const register = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(actionCreator(REGISTER_REQUEST, email))

    try {
      const result = await registerApi(email, password);

      dispatch(actionCreator(REGISTER_SUCCESS, result.data.login))
    } catch (error) {
 
      dispatch(actionCreator(REGISTER_FAILURE, error))
    }
  };
};
