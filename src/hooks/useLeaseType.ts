import { useApolloClient, gql } from '@apollo/client';

const query = gql`
  query LeaseTypeQuery {
    leaseTypes @client
  }
`;

/** 
* types not being used due to type related complexities/conflicts throughout all dependant components/pages.
* left for future ref.
export interface LeaseTypes {
  car: LeaseType;
  lcv: LeaseType;
}
export type LeaseType = 'Personal' | 'Business';
*/

/**
 * pass in optional boolean value
 * true set and get car leaseType,
 * false set and get lcv lease type,
 * passing in 0 args defaults to null inorder to get both types as object, no setting for both required
 * @return {Object}  return lease type setter fn and getter
 */
export default function useLeaseType(
  isCars: boolean | undefined | null = null,
) {
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
        // eslint-disable-next-line no-console
        console.log(res);
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
