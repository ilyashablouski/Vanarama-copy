import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  // ApolloLink,
} from '@apollo/client';
// import Router from 'next/router';
// import { onError } from '@apollo/client/link/error';
import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';
// import localforage from 'localforage';

// const inspect = require('../inspect');

// const AUTHORIZATION_ERROR_CODE = 'UNAUTHORISED';

// const LogLink = new ApolloLink((operation, forward) => {
//   console.log(operation);
//   return forward(operation);
// });

const HttpLink = createHttpLink({
  uri: process.env.API_URL!,
  fetch,
  credentials: 'include',
  // useGETForQueries: true,
  headers: {
    'x-api-key': process.env.API_KEY!,
  },
});

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
    link: from([HttpLink]),
    // link: from([LogLink, HttpLink]), // Enable for logging.

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
