import { useApolloClient, gql } from '@apollo/client';

const query = gql`
  query LeaseTypeQuery {
    leaseType @client
  }
`;
interface LeaseTypes {
  car: LeaseType;
  lcv: LeaseType;
}
type LeaseType = 'Personal' | 'Business';

export default function useLeaseType(isCars: boolean | undefined) {
  const client = useApolloClient();
  const initleaseType: LeaseTypes = { car: 'Personal', lcv: 'Business' };
  return {
    setCachedLeaseType(type: LeaseType): void {
      const leaseTypes: LeaseTypes = isCars
        ? { ...initleaseType, car: type }
        : { ...initleaseType, lcv: type };
      client.writeQuery({
        query,
        data: { __typename: 'LeaseType', leaseTypes },
      });
    },
    getCachedLeaseType(): LeaseType {
      try {
        const res = client.readQuery({ query });
        // eslint-disable-next-line no-console
        return isCars ? res.leaseType.car : res.leaseType.lcv;
      } catch {
        return isCars ? initleaseType.car : initleaseType.lcv;
      }
    },
  };
}
