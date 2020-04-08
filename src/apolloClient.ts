import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';

export default function createApolloClient(
  initialState: any,
  ctx?: NextPageContext,
) {
  return new ApolloClient({
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      // TODO: Put this in an environment variable
      uri: 'https://yv8w5m1kpc.execute-api.eu-west-2.amazonaws.com/dev/graphql',
      fetch,
    }),
    cache: new InMemoryCache({
      cacheRedirects: {
        Query: {
          personById: (_, args, { getCacheKey }) =>
            getCacheKey({ __typename: 'PersonType', id: args.id }),
        },
      },
    }).restore(initialState),
  });
}
