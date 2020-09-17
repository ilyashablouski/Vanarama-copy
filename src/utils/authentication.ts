import Cookies from 'js-cookie';

const ID_COOKIE_NAME = 'ic';

export function isUserAuthenticated() {
  const idCookie = Cookies.get(ID_COOKIE_NAME);

  // will be unavailable in case of expiration or absence
  return idCookie !== undefined;
}

export default isUserAuthenticated;
