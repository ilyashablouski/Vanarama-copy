import { useApolloClient, gql } from '@apollo/client';

const query = gql`
  query PriceTypeQuery {
    isPersonal @client
  }
`;

export default function usePriceType() {
  const client = useApolloClient();
  return {
    async setCachedIsPersonal(type: boolean) {
      return client.writeQuery({
        query,
        data: { __typename: 'PriceType', isPersonal: type },
      });
    },
    get isCachedPersonal() {
      try {
        const val = client.readQuery({ query });
        console.log(val);
        return val;
      } catch {
        return true;
      }
    },
  };
}
