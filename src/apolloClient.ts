import {
  defaultDataIdFromObject,
  IdGetterObj,
  InMemoryCache,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { NextPageContext } from 'next';

type ObjWithUuid = IdGetterObj & { uuid?: string };

export default function createApolloClient(
  initialState: any,
  ctx?: NextPageContext,
) {
  return new ApolloClient({
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    ssrMode: Boolean(ctx),
    link: new HttpLink({
<<<<<<< HEAD
      // TODO: Put this in an environment variable
      // uri: 'https://7wz7q9eq15.execute-api.eu-west-2.amazonaws.com/dev/graphql',
      uri: 'http://localhost:5305/graphql',
=======
      uri: process.env.API_URL!,
>>>>>>> develop
      fetch,
      headers: {
        'x-api-key': process.env.API_KEY!,
      },
    }),
    cache: new InMemoryCache({
      cacheRedirects: {
        Query: {
          personByUuid: (_, args, { getCacheKey }) =>
            getCacheKey({ __typename: 'PersonType', uuid: args.uuid }),
        },
      },
      dataIdFromObject: object => {
        if ((object as ObjWithUuid).uuid) {
          const { __typename, uuid } = object as ObjWithUuid;
          return `${__typename}:${uuid}`;
        }

        return defaultDataIdFromObject(object); // fall back to default handling
      },
    }).restore(initialState),
  });
}
