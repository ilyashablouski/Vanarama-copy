import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';

const BaseLink = createHttpLink({
  uri: process.env.API_URL!,
  fetch,
  headers: {
    'x-api-key': process.env.API_KEY!,
  },
});

// TODO: should be rewrited after implement cookie auth logic
const AuthorizationLink = setContext((request, prevContext) => ({
  headers: {
    ...prevContext.headers,
    Authorization: `Bearer`,
  },
}));

export default function createApolloClient(
  initialState: any,
  ctx?: NextPageContext,
) {
  return new ApolloClient({
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    ssrMode: Boolean(ctx),
    link: AuthorizationLink.concat(BaseLink as any) as any,
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
