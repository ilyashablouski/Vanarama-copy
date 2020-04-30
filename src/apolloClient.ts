import {
  defaultDataIdFromObject,
  IdGetterObj,
  InMemoryCache,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';

type ObjWithUuid = IdGetterObj & { uuid: string };

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
          personByUuid: (_, args, { getCacheKey }) =>
            getCacheKey({ __typename: 'PersonType', uuid: args.uuid }),
        },
      },
      dataIdFromObject: object => {
        switch (object.__typename) {
          case 'AddressType':
          case 'EmploymentHistoryType':
          case 'PersonType': {
            const { __typename, uuid } = object as ObjWithUuid;
            return `${__typename}:${uuid}`;
          }
          default:
            return defaultDataIdFromObject(object); // fall back to default handling
        }
      },
    }).restore(initialState),
  });
}
