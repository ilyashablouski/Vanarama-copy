import { useApolloClient, gql } from '@apollo/client';
import { LeaseTypeEnum } from '../../generated/globalTypes';

const query = gql`
  query LeaseTypeQuery {
    leaseTypes @client
  }
`;

interface ICachedLeaseType {
  car: LeaseTypeEnum;
  lcv: LeaseTypeEnum;
}

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
export default function useLeaseType<T>(isCars: T) {
  const client = useApolloClient();
  const initialLeaseTypes = {
    car: LeaseTypeEnum.PERSONAL,
    lcv: LeaseTypeEnum.BUSINESS,
  };

  type ICachedLeaseTypeResult = T extends null
    ? ICachedLeaseType
    : LeaseTypeEnum;

  return {
    setCachedLeaseType(type: LeaseTypeEnum): void {
      const leaseTypes = isCars
        ? { ...initialLeaseTypes, car: type }
        : { ...initialLeaseTypes, lcv: type };

      client.writeQuery({
        query,
        data: { __typename: 'LeaseTypes', leaseTypes },
      });
    },
    get cachedLeaseType(): ICachedLeaseTypeResult {
      try {
        const res = client.readQuery({ query });
        if (isCars === null) {
          return {
            car: res.leaseTypes.car,
            lcv: res.leaseTypes.lcv,
          } as ICachedLeaseTypeResult;
        }

        const result = isCars ? initialLeaseTypes.car : initialLeaseTypes.lcv;
        return result as ICachedLeaseTypeResult;
      } catch {
        if (isCars === null) {
          return {
            car: initialLeaseTypes.car,
            lcv: initialLeaseTypes.lcv,
          } as ICachedLeaseTypeResult;
        }

        const result = isCars ? initialLeaseTypes.car : initialLeaseTypes.lcv;
        return result as ICachedLeaseTypeResult;
      }
    },
  };
}
