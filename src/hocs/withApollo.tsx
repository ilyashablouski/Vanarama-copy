import { ApolloProvider } from '@apollo/react-hooks';
import withApollo from 'next-with-apollo';
import createApolloClient from '../apolloClient';

export default withApollo(
  ({ initialState }) => {
    return createApolloClient(initialState);
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
