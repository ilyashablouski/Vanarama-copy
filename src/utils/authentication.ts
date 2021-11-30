import Cookies from 'js-cookie';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { GET_SSR_AUTH_STATUS, ISSRAuthStatus } from '../gql/session';
import { LoginUserMutation } from '../../generated/LoginUserMutation';
import { Nullish } from '../types/common';

export const IDENTITY_COOKIE_NAME = 'ic';
export const ACCESS_COOKIE_NAME = 'ac';

const IS_DEVELOPMENT_ENV = process.env.ENV === 'dev';

export function isUserAuthenticated() {
  const identityCookie = Cookies.get(IDENTITY_COOKIE_NAME);

  return identityCookie === '1';
}

export const removeAuthenticationCookies = () => {
  if (IS_DEVELOPMENT_ENV) {
    Cookies.remove(ACCESS_COOKIE_NAME);
  }

  Cookies.remove(IDENTITY_COOKIE_NAME);
};

export const setLocalCookies = (data: Nullish<LoginUserMutation>) => {
  if (IS_DEVELOPMENT_ENV) {
    Cookies.set(IDENTITY_COOKIE_NAME, data?.loginV2?.idToken || '');
    Cookies.set(ACCESS_COOKIE_NAME, data?.loginV2?.accessToken || '');
  }
};

export const isUserAuthenticatedSSR = (cookie: string) =>
  cookie?.includes(`${IDENTITY_COOKIE_NAME}=1`);

export const getAuthStatusFromCache = (
  client: ApolloClient<NormalizedCacheObject | object>,
) =>
  client.readQuery<ISSRAuthStatus>({ query: GET_SSR_AUTH_STATUS })
    ?.isSSRAuthError;

export default isUserAuthenticated;
