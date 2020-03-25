import { register as registerApi } from '../../../apollo/account/api';
import { actionCreator } from '../../utils';
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const register = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(actionCreator(REGISTER_REQUEST, email));

    try {
      await registerApi(email, password);

      dispatch(actionCreator(REGISTER_SUCCESS, email));
    } catch (error) {
      dispatch(actionCreator(REGISTER_FAILURE, error));
    }
  };
};
