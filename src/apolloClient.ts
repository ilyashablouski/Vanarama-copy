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
import { Env } from './utils/env';

import { isSessionFinishedCache } from './cache';

const AUTHORIZATION_ERROR_CODE = 'UNAUTHORISED';
// A list of queries that we don't want to be cached in CDN
const QUERIES_WITHOUT_CDN_CACHING = [
  'GetLeaseCompanyData',
  'GetCreditApplicationByOrderUuid',
  'GetCompanyDirectorDetailsQuery',
  'GetDirectorDetailsQuery',
  'GetCompanySummaryQuery',
  'GetAboutYouDataQuery',
  'GetPartyByUuid',
  'GetAboutYouPageQuery',
  'GetPersonByUuid',
  'GetPerson',
  'GetAddressContainerDataQuery',
  'GetEmploymentContainerDataQuery',
  'GetExpensesPageDataQuery',
  'GetBankDetailsPageDataQuery',
  'GetPersonSummaryQuery',
  'GetCompaniesByPersonUuid',
  'GetMyOrders',
  'GetOrderByUuid',
  'MyAccount',
];

const httpLink = new HttpLink({
  uri: process.env.API_URL!,
  fetch,
  credentials: 'include',
  headers: {
    'x-api-key': process.env.API_KEY!,
  },
  useGETForQueries: false,
});

const persistedQueryLink = new ApolloLink((operation, forward) => {
  return forward(operation);
}).split(
  () =>
    [Env.DEV, Env.UAT, Env.PRE_PROD, Env.PROD].includes(process.env.ENV as Env),
  new ApolloLink((operation, forward) => {
    return forward(operation);
  }).split(
    operation => QUERIES_WITHOUT_CDN_CACHING.includes(operation.operationName),
    // Assumes that CDN is configured not to cache POST queries
    createPersistedQueryLink({
      useGETForHashedQueries: false,
    }) as any,
    createPersistedQueryLink({
      useGETForHashedQueries: true,
    }) as any,
  ),
  new ApolloLink((operation, forward) => {
    return forward(operation);
  }),
);

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

const logLink = new ApolloLink((operation, forward) => {
  if ([Env.DEV, Env.UAT].includes(process.env.ENV as Env)) {
    const query = {
      name: operation.operationName,
      variables: operation.variables,
    };

    console.log('\n[GraphQL query]:');
    console.log(`${JSON.stringify(query, null, 4)}\n`);
  }

  return forward(operation);
});

// eslint-disable-next-line consistent-return
const authErrorLink = onError(({ graphQLErrors, forward, operation }) => {
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
      Router.replace(
        `/account/login-register?redirect=${currentPath}`,
        '/account/login-register',
      );
    }

    isSessionFinishedCache(true);
  });
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if ([Env.DEV, Env.UAT].includes(process.env.ENV as Env)) {
    const { query, ...operationWithoutQuery } = operation;

    if (graphQLErrors) {
      graphQLErrors.forEach(graphQLError => {
        console.log(
          `\n[GraphQL][Error]:${JSON.stringify(graphQLError, null, 4)}\n`,
        );
        console.log(
          `[GraphQL][Operation]:\n${JSON.stringify(
            operationWithoutQuery,
            null,
            4,
          )}\n`,
        );
      });
    }

    if (networkError) {
      console.log(
        `\n[Network][Error]:\n${JSON.stringify(networkError, null, 4)}`,
      );
      console.log(
        `[Network][Operation]:\n${JSON.stringify(
          operationWithoutQuery,
          null,
          4,
        )}\n`,
      );
    }
  }
});

function apolloClientLink() {
  const links = [
    logLink,
    errorLink,
    authErrorLink,
    retryLink,
    persistedQueryLink,
    httpLink,
  ];

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
