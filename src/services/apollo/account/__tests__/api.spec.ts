import { login } from '../api';
import { apolloClient } from '../../apolloClient';
import { LOGIN } from '../gql';

jest.mock('../../apolloClient');

describe('Apollo api Success', () => {
  const email = 'email';
  const password = 'password';

  it('calls mutate correctly', async () => {
      await login(email, password);

      expect(apolloClient.mutate).toHaveBeenCalledWith({
        mutation: LOGIN,
        variables: { email, pw: password },
      });
  });
});

