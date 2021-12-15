import { ApolloProvider } from '@apollo/client';
import withApollo from 'next-with-apollo';
import React, { ComponentType } from 'react';
import createApolloClient, {
  APOLLO_STATE_PROP_NAME,
  useApollo,
} from '../apolloClient';

export default withApollo(
  ({ initialState, ctx }) => {
    return createApolloClient(initialState, ctx);
  },
  {
    render: ({ Page, props }) => {
      const { apollo } = props;
      return (
        <ApolloProvider client={apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  },
);

// HOC for add ApolloProvider for App container
export const withApolloProvider = (Component: ComponentType<any>) => ({
  ...props
}) => {
  const apollo = useApollo(props?.pageProps?.[APOLLO_STATE_PROP_NAME]);
  return (
    <ApolloProvider client={apollo}>
      <Component {...props} />
    </ApolloProvider>
  );
};
