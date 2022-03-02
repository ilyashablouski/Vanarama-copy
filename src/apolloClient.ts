/* eslint-disable no-console */
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from '@apollo/client';
// import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { RetryLink } from '@apollo/client/link/retry';
// import { sha256 } from 'crypto-hash';

import Router from 'next/router';
import { onError } from '@apollo/client/link/error';
import fetch from 'isomorphic-unfetch';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import localforage from 'localforage';
import merge from 'deepmerge';

import isEqual from 'lodash.isequal';
import { getAdditionalDataVariable } from './utils/helpers';
import { Env } from './utils/env';

import { isSessionFinishedCache } from './cache';
import resolvers from './resolvers';
import { isServer } from './utils/deviceType';

import formatQueryVariables from './utils/logging';

export const APOLLO_STATE_PROP_NAME = 'APOLLO_CACHE';
let apolloClient: ApolloClient<NormalizedCacheObject | object>;

export const AUTHORIZATION_ERROR_CODE = 'UNAUTHORISED';
// A list of queries that we don't want to be cached in CDN
// const QUERIES_WITHOUT_CDN_CACHING = [
//   'GetLeaseCompanyData',
//   'GetCreditApplicationByOrderUuid',
//   'GetCompanyDirectorDetailsQuery',
//   'GetDirectorDetailsQuery',
//   'GetCompanySummaryQuery',
//   'GetAboutYouDataQuery',
//   'GetPartyByUuid',
//   'GetAboutYouPageQuery',
//   'GetPersonByUuid',
//   'GetPerson',
//   'GetAddressContainerDataQuery',
//   'GetEmploymentContainerDataQuery',
//   'GetExpensesPageDataQuery',
//   'GetBankDetailsPageDataQuery',
//   'GetPersonSummaryQuery',
//   'GetCompaniesByPersonUuid',
//   'GetMyOrders',
//   'GetOrderByUuid',
//   'GetQuoteDetails',
//   'MyAccount',
// ];

const createEnhancedFetch = (cookie: string) => {
  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        Cookie: cookie,
      },
    }).then(response => response);
  };

  return enhancedFetch;
};

const httpLink = (cookie: string) => {
  const enhancedFetch = createEnhancedFetch(cookie);
  return new HttpLink({
    uri: process.env.API_URL!,
    fetch: enhancedFetch,
    credentials: 'include',
    headers: {
      'x-api-key': process.env.API_KEY!,
    },
    useGETForQueries: false,
  });
};

// const persistedQueryLink = new ApolloLink((operation, forward) => {
//   return forward(operation);
// }).split(
//   () =>
//     [Env.DEV, Env.UAT, Env.PRE_PROD, Env.PROD].includes(process.env.ENV as Env),
//   new ApolloLink((operation, forward) => {
//     return forward(operation);
//   }).split(
//     operation => QUERIES_WITHOUT_CDN_CACHING.includes(operation.operationName),
//     // Assumes that CDN is configured not to cache POST queries
//     createPersistedQueryLink({
//       useGETForHashedQueries: false,
//       sha256,
//     }) as any,
//     createPersistedQueryLink({
//       useGETForHashedQueries: true,
//       sha256,
//     }) as any,
//   ),
//   new ApolloLink((operation, forward) => {
//     return forward(operation);
//   }),
// );

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
    if (operation.query.loc?.source.body) {
      console.log('\n[GraphQL query]:');
      console.log(operation.query.loc?.source.body);
      console.log(formatQueryVariables(operation.variables));
    }
  }

  return forward(operation).map(result => {
    if ([Env.DEV, Env.UAT].includes(process.env.ENV as Env)) {
      if (result.data) {
        console.log(
          `\n[GraphQL response]: Received data for ${operation.operationName}`,
        );
        console.log(`\n[GraphQL response data]:`, result.data);
      }
    }

    return result;
  });
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
    const isLogin = currentPath.includes('/account/login-register');

    // don't make client redirect if ssr unauthorised error happened
    if (!isOlaf && !isLogin) {
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
      const operationDetails = {
        operationName: operation.operationName,
        variables: operation.variables,
        extensions: operation.extensions,
      };

      graphQLErrors.forEach(graphQLError => {
        console.log(
          `\n[GraphQL][Error]:${JSON.stringify(graphQLError, null, 4)}\n`,
        );
        console.log(
          `[GraphQL][Operation that caused error]:\n${JSON.stringify(
            operationDetails,
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

const creditApplicationQueryValidationLink = new ApolloLink(
  (operation, forward) => {
    if (operation.operationName === 'GetLeaseCompanyData') {
      return forward(operation).map(query => {
        // skip possible redirect from server side
        if (typeof window === 'undefined') {
          return query;
        }

        if (
          (query?.errors || []).length === 0 &&
          !!query.data?.creditApplicationByOrderUuid?.submittedAt &&
          !Router.router?.asPath?.includes('/thank-you')
        ) {
          const url = '/olaf/error';
          Router.replace(url, url);

          return {
            ...query,
            data: {
              creditApplicationByOrderUuid: null,
            },
          };
        }

        return query;
      });
    }

    return forward(operation);
  },
);

const attachedAdditionalDataLink = new ApolloLink((operation, forward) => {
  if (operation.operationName === 'CreateUpdateOrder') {
    const modifiedOperation = {
      ...operation,
      variables: {
        ...operation.variables,
        input: {
          ...(operation.variables?.input || {}),
          ...getAdditionalDataVariable(),
        },
      },
      setContext: operation.setContext,
      getContext: operation.getContext,
    };

    return forward(modifiedOperation);
  }

  if (operation.operationName === 'CreateOpportunity') {
    const modifiedOperation = {
      ...operation,
      variables: {
        ...operation.variables,
        ...getAdditionalDataVariable(),
      },
      setContext: operation.setContext,
      getContext: operation.getContext,
    };

    return forward(modifiedOperation);
  }

  return forward(operation);
});

function apolloClientLink(cookie: string) {
  const links = [
    logLink,
    errorLink,
    authErrorLink,
    retryLink,
    // persistedQueryLink,
    creditApplicationQueryValidationLink,
    attachedAdditionalDataLink,
    httpLink(cookie),
  ];

  // NOTE: Type 'RetryLink' is missing the following properties from type 'ApolloLink': onError, setOnError
  return ApolloLink.from(links as any);
}

export default function createApolloClient(
  initialState: any,
  ctx?: GetServerSidePropsContext | NextPageContext,
) {
  const cookie = ctx?.req?.headers.cookie || '';

  return new ApolloClient({
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    ssrMode: isServer(),
    link: apolloClientLink(cookie),
    connectToDevTools: Boolean(process.env.ENABLE_DEV_TOOLS),
    resolvers,
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
    }),
  });
}

/**
 * @param initialState - Apollo Cache State
 * @param ctx - Next.JS context
 * */
export function initializeApollo(
  initialState?: NormalizedCacheObject,
  ctx?: GetServerSidePropsContext | NextPageContext,
) {
  const initializedApolloClient =
    apolloClient ?? createApolloClient(initialState, ctx);
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = initializedApolloClient.cache.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(destination =>
          sourceArray.every(source => {
            return !isEqual(destination, source);
          }),
        ),
      ],
    });
    // Restore the cache with the merged data
    initializedApolloClient.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return initializedApolloClient;
  }

  if (!apolloClient) {
    apolloClient = initializedApolloClient;
  }

  return initializedApolloClient;
}

interface IPageProps<T> {
  props: T;
}

type TApolloCache = {
  [APOLLO_STATE_PROP_NAME]?: NormalizedCacheObject;
};

type TPropsWithApolloCache<T extends TApolloCache> = {
  [Property in keyof T]: T[Property];
};

interface IPropsWithApolloCache<T> {
  props: TPropsWithApolloCache<T>;
}

export const addApolloState = <T>(
  client: ApolloClient<NormalizedCacheObject | object>,
  pageProps: IPageProps<T>,
): IPropsWithApolloCache<T> => {
  let pagePropsTemp;
  if (pageProps?.props) {
    pagePropsTemp = {
      props: {
        ...pageProps.props,
        [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
      },
    };
  }
  return pagePropsTemp || pageProps;
};

export const useApollo = (apolloCache?: NormalizedCacheObject) =>
  initializeApollo(apolloCache);
