import { ApolloProvider } from '@apollo/react-hooks';
import withApollo from 'next-with-apollo';
import createApolloClient from '../apolloClient';

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
