import { isUserAuthenticated } from './authentication';

describe('isUserAuthenticated', () => {
  const ID_COOKIE_NAME = 'ic';
  const ID_COOKIE_VALUE = 'TEST_COOKIE_VALUE';

  it('should return that user is NOT authenticated because of empty cookies', () => {
    const cookie = '';
    document.cookie = cookie;

    const isuthenticated = isUserAuthenticated();
    expect(isuthenticated).toBe(false);
  });

  it('should return that suer is NOT uthenticated because cookie is expired', () => {
    const expiredDate = new Date(2000, 1, 1);
    const cookie = `${ID_COOKIE_NAME}=${ID_COOKIE_VALUE}; Expires=${expiredDate}`;
    document.cookie = cookie;

    const isuthenticated = isUserAuthenticated();
    expect(isuthenticated).toBe(false);
  });

  it('should return that user is authenticated', () => {
    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() + 1);
    const cookie = `${ID_COOKIE_NAME}=${ID_COOKIE_VALUE}; Expires=${validDate}`;
    document.cookie = cookie;

    const isuthenticated = isUserAuthenticated();
    expect(isuthenticated).toBe(true);
  });
});
