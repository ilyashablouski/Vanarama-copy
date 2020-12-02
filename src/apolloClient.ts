import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import Router from 'next/router';
import { onError } from '@apollo/client/link/error';
import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';

const inspect = require('../inspect');

const HttpLink = createHttpLink({
  uri: process.env.API_URL!,
  fetch,
  credentials: 'include',
  useGETForQueries: true,
  headers: {
    'x-api-key': process.env.API_KEY!,
  },
});

const ErrorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    inspect(['GQL Error', graphQLErrors]);

    const authorizationError = graphQLErrors.find(
      error => error?.extensions?.code === 'UNAUTHORISED',
    );
    if (authorizationError) {
      Router.replace(
        `/account/login-register?redirect=${Router.router?.asPath || '/'}`,
      );
    }
  }
});

export default function createApolloClient(
  initialState: any,
  ctx?: NextPageContext,
) {
  return new ApolloClient({
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    ssrMode: Boolean(ctx),
    link: from([ErrorLink, HttpLink]),
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
