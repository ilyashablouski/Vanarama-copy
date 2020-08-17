import { useApolloClient, gql } from '@apollo/client';

const query = gql`
  query LeaseTypeQuery {
    leaseType @client
  }
`;

type LeaseType = 'Personal' | 'Business';

export default function useLeaseType(isCars: boolean | undefined) {
  const client = useApolloClient();
  return {
    setCachedLeaseType(type: string): void {
      const leaseType = { car: 'Personal', lcv: 'Personal' };
      if (isCars) {
        leaseType.car = type;
      } else {
        leaseType.lcv = type;
      }
      client.writeQuery({
        query,
        data: { __typename: 'LeaseType', leaseType },
      });
    },
    getCachedLeaseType(): LeaseType {
      try {
        const res = client.readQuery({ query });
        // eslint-disable-next-line no-console
        return isCars ? res.leaseType.car : res.leaseType.lcv;
      } catch {
        return 'Personal';
      }
    },
  };
}
