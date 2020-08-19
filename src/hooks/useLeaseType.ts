import { useApolloClient, gql } from '@apollo/client';

const query = gql`
  query LeaseTypeQuery {
    leaseTypes @client
  }
`;

/* export interface LeaseTypes {
  car: LeaseType;
  lcv: LeaseType;
} */

// not doing much due to type related complexities throughout all dependant components/pages.
// left for future ref.
export type LeaseType = 'Personal' | 'Business';

export default function useLeaseType(isCars: boolean | undefined) {
  const client = useApolloClient();
  const initleaseTypes = { car: 'Personal', lcv: 'Business' };
  return {
    setCachedLeaseType(type: string): void {
      const leaseTypes = isCars
        ? { ...initleaseTypes, car: type }
        : { ...initleaseTypes, lcv: type };
      client.writeQuery({
        query,
        data: { __typename: 'LeaseTypes', leaseTypes },
      });
    },
    get cachedLeaseType(): LeaseType | string {
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
