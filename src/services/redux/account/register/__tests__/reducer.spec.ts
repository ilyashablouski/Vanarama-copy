import * as actions from '../../actionTypes';
import reducer from '../reducer';
import { accountMock } from '../../../../__fixtures__/account';

const initialState = {
    success: null, 
    error: null,
};

describe('Register reducer', () => {
  describe('Request initiated', () => {
    test('sets isRequesting to true', () => {
      expect(reducer(initialState, {
        type: actions.REGISTER_REQUEST,
      })).toEqual({ ...initialState, isRequesting: true });
    });
  });

  describe('Success', () => {
    test('sets token to the state', () => {
      expect(reducer(initialState, {
        type: actions.REGISTER_SUCCESS,
        payload: accountMock.register.success,
      })).toEqual({ ...initialState, success: true });
    });
  });

  describe('Failure', () => {
    test('sets error to the state', () => {
      expect(reducer(initialState, {
        type: actions.REGISTER_FAILURE,
        payload: accountMock.register.failure,
      })).toEqual({ ...initialState, success: false, error: accountMock.register.failure});
    });
  });
});
