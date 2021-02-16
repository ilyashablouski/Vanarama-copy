/* eslint-disable no-console */
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
// import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

// import Router from 'next/router';
// import { onError } from '@apollo/client/link/error';
import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';
// import localforage from 'localforage';

// const inspect = require('../inspect');

// const AUTHORIZATION_ERROR_CODE = 'UNAUTHORISED';

const httpLink = new HttpLink({
  uri: process.env.API_URL!,
  fetch,
  credentials: 'include',
  // useGETForQueries: true,
  headers: {
    'x-api-key': process.env.API_KEY!,
  },
});

// NOTE: Type 'HttpLink | ApolloLink' is not assignable to type 'ApolloLink | RequestHandler' - https://github.com/apollographql/apollo-client/issues/6011
// const persistedQueriesLink = createPersistedQueryLink({
//   useGETForHashedQueries: true,
// }) as any;

const logLink = new ApolloLink((operation, forward) => {
  const query = {
    name: operation.operationName,
    variables: operation.variables,
  };

  console.log('\nGraphQL Query:');
  console.log(query);

  return forward(operation);
});

function apolloClientLink() {
  let links = [httpLink];

  // TODO: https://autorama.atlassian.net/browse/DIG-5174
  // if (process.env.ENV && ['uat', 'production'].includes(process.env.ENV)) {
  //   links = [persistedQueriesLink, ...links];
  // }

  if (process.env.ENV && ['dev', 'uat'].includes(process.env.ENV)) {
    // NOTE: Type 'ApolloLink' is missing the following properties from type 'HttpLink': options, requester
    links = [logLink as any, ...links];
  }

  return ApolloLink.from(links);
}

//  TODO: to return redirect need to find
//   out how to refresh token for temp user and finally fix olaf
// const ErrorLink = onError(({ networkError, graphQLErrors }) => {
//   if (networkError) {
//     inspect(['Network Error', networkError]);
//   }
//
//   if (graphQLErrors) {
//     inspect(['GQL Error', graphQLErrors]);
//
//     const authorizationError = graphQLErrors.find(
//       error =>
//         AUTHORIZATION_ERROR_CODE.localeCompare(
//           error?.extensions?.code,
//           undefined,
//           { sensitivity: 'base' },
//         ) === 0,
//     );
//     if (authorizationError) {
//       localforage
//         .removeItem('person')
//         .finally(() =>
//           Router.replace(
//             `/account/login-register?redirect=${Router.router?.asPath || '/'}`,
//           ),
//         );
//     }
//   }
// });

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
