import { register as registerAction } from '../actions';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../../actionTypes';
import { actionCreator } from '../../../utils';
import { register } from '../../../../apollo/account/api';

jest.mock('../../../../apollo/account/api', () => ({
  register: jest.fn(() => {
    return { data: 'success' };
  }),
}));

describe('Register actions', () => {
  const email = 'email';
  const password = 'password';

  describe('REGISTER_REQUEST', () => {
    it('dispatches a register request', async () => {
      const dispatch = jest.fn();
      await registerAction(email, password)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        actionCreator(REGISTER_REQUEST, email),
      );
    });
  });

  describe('REGISTER_SUCCESS', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('calls register api successfully', async () => {
      const dispatch = jest.fn();
      await registerAction(email, password)(dispatch);

      expect(register).toHaveBeenCalledWith(email, password);
    });

    it('dispatches a register event [REGISTER_SUCCESS]', async () => {
      const dispatch = jest.fn();
      await registerAction(email, password)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        actionCreator(REGISTER_SUCCESS, email),
      );
    });
  });

  describe('REGISTER_FAILURE', () => {
    it('dispatches a register event on error [REGISTER_FAILURE]', async () => {
      (register as jest.Mock).mockRejectedValue(new Error('Some error'));

      const dispatch = jest.fn();
      await registerAction(email, password)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        actionCreator(REGISTER_FAILURE, new Error('Some error')),
      );
    });
  });
});
