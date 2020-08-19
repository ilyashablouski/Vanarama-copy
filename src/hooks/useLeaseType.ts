import { useApolloClient, gql } from '@apollo/client';

const query = gql`
  query LeaseTypeQuery {
    leaseTypes @client
  }
`;
interface LeaseTypes {
  car: LeaseType;
  lcv: LeaseType;
}
type LeaseType = 'Personal' | 'Business';

export default function useLeaseType(isCars: boolean | undefined) {
  const client = useApolloClient();
  const initleaseTypes: LeaseTypes = { car: 'Personal', lcv: 'Business' };
  return {
    setCachedLeaseType(type: LeaseType): void {
      const leaseTypes: LeaseTypes = isCars
        ? { ...initleaseTypes, car: type }
        : { ...initleaseTypes, lcv: type };
      client.writeQuery({
        query,
        data: { __typename: 'LeaseTypes', leaseTypes },
      });
    },
    getCachedLeaseType(): LeaseType {
      try {
        const res = client.readQuery({ query });
        // eslint-disable-next-line no-console
        console.log(res);
        return isCars ? res.leaseTypes.car : res.leaseTypes.lcv;
      } catch {
        return isCars ? initleaseTypes.car : initleaseTypes.lcv;
      }
    },
  };
}
