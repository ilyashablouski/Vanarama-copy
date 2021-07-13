import Cookies from 'js-cookie';

const IDENTITY_COOKIE_NAME = 'ic';
const IDENTITY_LOCAL_COOKIE_NAME = 'ic_local';

export function isUserAuthenticated() {
  const identityCookie = Cookies.get(IDENTITY_COOKIE_NAME);
  const identityLocalCookie = Cookies.get(IDENTITY_LOCAL_COOKIE_NAME);

  // will be unavailable in case of expiration or absence
  return [identityCookie, identityLocalCookie].some(cookie => cookie === '1');
}

export function removeAuthenticationCookies() {
  Cookies.remove(IDENTITY_COOKIE_NAME);
  Cookies.remove(IDENTITY_LOCAL_COOKIE_NAME);
}

export default isUserAuthenticated;
