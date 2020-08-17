import { useApolloClient, gql } from '@apollo/client';

const query = gql`
  query PriceTypeQuery {
    leaseType @client
  }
`;

export default function useLeaseType() {
  const client = useApolloClient();
  return {
    setCachedLeaseType(type: string): void {
      client.writeQuery({
        query,
        data: { __typename: 'LeaseType', leaseType: type },
      });
    },
    getCachedLeaseType(): string {
      const res = client.readQuery({ query });
      // eslint-disable-next-line no-console
      console.log(res.leaseType);
      return res.leaseType ? res.leaseType : 'Personal';
    },
  };
}
