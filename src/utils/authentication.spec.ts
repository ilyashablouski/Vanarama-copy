import { isUserAuthenticated } from './authentication';

const ID_COOKIE_NAME = 'ic';
const ID_COOKIE_VALUE = 'TEST_COOKIE_VALUE';

describe('WHEN ID cookie is empty', () => {
  it('should return false', () => {
    const cookie = '';
    document.cookie = cookie;

    const isAuthenticated = isUserAuthenticated();
    expect(isAuthenticated).toBe(false);
  });
});

describe('WHEN ID cookie is expired', () => {
  it('should return false', () => {
    const expiredDate = new Date(2000, 1, 1);
    const cookie = `${ID_COOKIE_NAME}=${ID_COOKIE_VALUE}; Expires=${expiredDate}`;
    document.cookie = cookie;

    const isAuthenticated = isUserAuthenticated();
    expect(isAuthenticated).toBe(false);
  });
});

describe('WHEN ID cookie is NOT empty AND is NOT expired', () => {
  it('should return true', () => {
    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() + 1);
    const cookie = `${ID_COOKIE_NAME}=${ID_COOKIE_VALUE}; Expires=${validDate}`;
    document.cookie = cookie;

    const isAuthenticated = isUserAuthenticated();
    expect(isAuthenticated).toBe(true);
  });
});
