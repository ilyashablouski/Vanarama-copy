import { useApolloClient, gql } from '@apollo/client';

const query = gql`
  query LeaseTypeQuery {
    leaseType @client
  }
`;

type LeaseType = 'Personal' | 'Business';

export default function useLeaseType() {
  const client = useApolloClient();
  return {
    setCachedLeaseType(type: string): void {
      client.writeQuery({
        query,
        data: { __typename: 'LeaseType', leaseType: type },
      });
    },
    getCachedLeaseType(): LeaseType {
      try {
        const res = client.readQuery({ query });
        // eslint-disable-next-line no-console
        console.log(res.leaseType);
        return res.leaseType;
      } catch {
        return 'Personal';
      }
    },
  };
}
