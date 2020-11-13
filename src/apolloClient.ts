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
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const HttpLink = createHttpLink({
  uri: publicRuntimeConfig.apiUrl!,
  fetch,
  credentials: 'include',
  headers: {
    'x-api-key': publicRuntimeConfig.apiKey!,
  },
});

const ErrorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
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
    connectToDevTools: Boolean(publicRuntimeConfig.enableDevTools),
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
