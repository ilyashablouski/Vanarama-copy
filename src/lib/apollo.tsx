import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import fetch from "isomorphic-unfetch"

export const client = new ApolloClient({
  link: createHttpLink({
    // uri: "http://localhost:5300/graphql",
    uri: "https://79ukz5xprd.execute-api.eu-west-2.amazonaws.com/dev/graphql",
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
})
