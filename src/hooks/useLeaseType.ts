import { useApolloClient, gql } from '@apollo/client';

const query = gql`
  query LeaseTypeQuery {
    leaseTypes @client
  }
`;

/** 
* types not being used due to type related complexities/conflicts throughout all dependant components/pages.
* left for future ref.

interface LeaseTypes {
  car: LeaseType;
  lcv: LeaseType;
}

type LeaseType = 'Personal' | 'Business';
*/

/**
 * --- useLeaseType hook ---
 * pass in required arg
 * true to set and get car leaseType,
 * false | undefined to set and get lcv lease type,
 * null inorder to get both types as object, no set required
 * @return {Object}  return lease type setter fn and getter
 */
export default function useLeaseType(isCars: boolean | undefined | null) {
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
    get cachedLeaseType() {
      try {
        const res = client.readQuery({ query });
        if (isCars === null) {
          return { car: res.leaseTypes.car, lcv: res.leaseTypes.lcv };
        }
        return isCars ? res.leaseTypes.car : res.leaseTypes.lcv;
      } catch {
        if (isCars === null) {
          return { car: initleaseTypes.car, lcv: initleaseTypes.lcv };
        }
        return isCars ? initleaseTypes.car : initleaseTypes.lcv;
      }
    },
  };
}
