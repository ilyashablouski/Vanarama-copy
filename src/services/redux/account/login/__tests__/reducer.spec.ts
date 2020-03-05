import * as actions from '../../actionTypes';
import reducer from '../reducer';
import { accountMock } from '../../../../__fixtures__/account';

const initialState = {
    authenticated: null, 
    data: null,
};

describe('Login reducer', () => {
  describe('Request initiated', () => {
    test('sets isLoggingIn to true', () => {
      expect(reducer(initialState, {
        type: actions.LOGIN_REQUEST,
      })).toEqual({ ...initialState, isLoggingIn: true });
    });
  });

  describe('Success', () => {
    test('sets token to the state', () => {
      expect(reducer(initialState, {
        type: actions.LOGIN_SUCCESS,
        payload: accountMock.login.success,
      })).toEqual({ ...initialState, authenticated: true, data: { token: accountMock.login.success } });
    });
  });

  describe('Failure', () => {
    test('sets error to the state', () => {
      expect(reducer(initialState, {
        type: actions.LOGIN_FAILURE,
        payload: accountMock.login.failure,
      })).toEqual({ ...initialState, authenticated: false, data: null });
    });
  });
});
