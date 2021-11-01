import Cookies from 'js-cookie';
import {ApolloClient, NormalizedCacheObject} from '@apollo/client';
import { GET_SSR_AUTH_STATUS, ISSRAuthStatus } from '../gql/session';

export const IDENTITY_COOKIE_NAME = 'ic';
export const IDENTITY_LOCAL_COOKIE_NAME = 'ic_local';

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

export const isUserAuthenticatedSSR = (cookie: string) =>
  cookie?.includes(`${IDENTITY_COOKIE_NAME}=1`) ||
  cookie?.includes(`${IDENTITY_LOCAL_COOKIE_NAME}=1`);

export const getAuthStatusFromCache = (
  client: ApolloClient<NormalizedCacheObject>,
) =>
  client.readQuery<ISSRAuthStatus>({ query: GET_SSR_AUTH_STATUS })
    ?.isSSRAuthError;

export default isUserAuthenticated;
