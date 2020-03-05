import { login as loginAction } from '../actions';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../../actionTypes';
import { actionCreator } from '../../../utils';
import { accountMock } from '../../../../__fixtures__/account';
import { login } from '../../../../apollo/account/api';

jest.mock('../../../../apollo/account/api', () => ({
  login: jest.fn(() => { return { data: { login: 'token'} }}),
}));

describe('Login actions', () => {
  const email ='email';
  const password = 'password';
  
  describe('LOGIN_REQUEST', () => {
    it('dispatches a login request', async () => {
      const dispatch = jest.fn();
      await loginAction(email, password)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(actionCreator(LOGIN_REQUEST, email));
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('calls login api successfully', async () => {
      const dispatch = jest.fn();
      await loginAction(email, password)(dispatch);

      expect(login).toHaveBeenCalledWith(email, password);
    });

    it('dispatches a login event [LOGIN_SUCCESS]', async () => {
      const dispatch = jest.fn();
      await loginAction(email, password)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(actionCreator(LOGIN_SUCCESS, accountMock.login.success.data.login));
    });
  });

  describe('LOGIN_FAILURE', () => {
    it('dispatches a login event on error [LOGIN_FAILURE]', async () => {
      (login as jest.Mock).mockImplementationOnce(() => Promise.reject(null))
      const dispatch = jest.fn();
      await loginAction(email, password)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(actionCreator(LOGIN_FAILURE, null));
    });
  });
});
