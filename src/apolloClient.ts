/* eslint-disable no-console */
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';

import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

import Router from 'next/router';
import { onError } from '@apollo/client/link/error';
import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';
import localforage from 'localforage';

import { isSessionFinishedCache } from './cache';

const AUTHORIZATION_ERROR_CODE = 'UNAUTHORISED';

const httpLink = new HttpLink({
  uri: process.env.API_URL!,
  fetch,
  credentials: 'include',
  headers: {
    'x-api-key': process.env.API_KEY!,
  },
});

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: error => !!error,
  },
});

// NOTE: Type 'HttpLink | ApolloLink' is not assignable to type 'ApolloLink | RequestHandler' - https://github.com/apollographql/apollo-client/issues/6011
const persistedQueriesLink = createPersistedQueryLink({
  useGETForHashedQueries: true,
  // disable hash for a session in case if some of queries is not found in cache
  // disable: errorResponse =>
  //   errorResponse.graphQLErrors?.some(
  //     error => error.extensions?.code === 'PERSISTED_QUERY_NOT_FOUND',
  //   ) || false,
}) as any;

const logLink = new ApolloLink((operation, forward) => {
  const query = {
    name: operation.operationName,
    variables: operation.variables,
  };

  console.log('\nGraphQL Query:');
  console.log(query);

  return forward(operation);
});

// eslint-disable-next-line consistent-return
const AuthErrorLink = onError(({ graphQLErrors, forward, operation }) => {
  // only graphQLErrors contain information about auth error
  if (!graphQLErrors) {
    return forward(operation);
  }

  const authorizationError = graphQLErrors.find(
    error =>
      AUTHORIZATION_ERROR_CODE.localeCompare(
        error?.extensions?.code,
        undefined,
        { sensitivity: 'base' },
      ) === 0,
  );

  // handle only auth errors and
  // avoid error handling on server
  // because of functionality that only can be called on client
  if (!authorizationError || typeof window === 'undefined') {
    return forward(operation);
  }

  // cookies are already deleted by gateway after auth error
  // clear local data
  localforage.clear().finally(() => {
    const currentPath = Router.router?.asPath || '/';
    const isOlaf = currentPath.includes('/olaf/');

    if (!isOlaf) {
      // redirect to login-register from private pages except olaf
      Router.replace(`/account/login-register?redirect=${currentPath}`);
    }

    isSessionFinishedCache(true);
  });
});

function apolloClientLink() {
  let links = [AuthErrorLink, retryLink, httpLink];

  // Enable persisted query per env.
  if (
    process.env.ENV &&
    ['dev', 'uat', 'pre-prod', 'prod'].includes(process.env.ENV)
  ) {
    // save order to have possibility to retry operations
    links = [AuthErrorLink, retryLink, persistedQueriesLink, httpLink];
  }

  if (process.env.ENV && ['dev', 'uat'].includes(process.env.ENV)) {
    // NOTE: Type 'ApolloLink' is missing the following properties from type 'HttpLink': options, requester
    links = [logLink as any, ...links];
  }

  // NOTE: Type 'RetryLink' is missing the following properties from type 'ApolloLink': onError, setOnError
  return ApolloLink.from(links as any);
}

export default function createApolloClient(
  initialState: any,
  ctx?: NextPageContext,
) {
  return new ApolloClient({
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    ssrMode: Boolean(ctx),
    link: apolloClientLink(),
    connectToDevTools: Boolean(process.env.ENABLE_DEV_TOOLS),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            personByUuid(existing, { args, toReference }) {
              return (
                existing ||
                toReference({ __typename: 'PersonType', uuid: args?.uuid })
              );
            },
            isSessionFinished: {
              read() {
                return isSessionFinishedCache() || false;
              },
            },
          },
        },
        PersonType: {
          keyFields: ['uuid'],
        },
        CompanyDataType: {
          keyFields: ['companyNumber'],
        },
      },
    }).restore(initialState),
  });
}
