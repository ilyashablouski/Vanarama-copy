import { gql, useMutation, useQuery } from '@apollo/client';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  GetCreditApplicationByOrderUuidDataForCreditCheckVariables,
  GetCreditApplicationByOrderUuidDataForCreditCheck,
} from '../../../generated/GetCreditApplicationByOrderUuidDataForCreditCheck';

export const GET_CREDIT_APPLICATION_BY_ORDER_UUID = gql`
  query GetCreditApplicationByOrderUuidDataForCreditCheck($orderUuid: ID!) {
    creditApplicationByOrderUuid(orderUuid: $orderUuid) {
      lineItem {
        vehicleProduct {
          vehicleType
          depositPayment
          monthlyPayment
        }
        order {
          id
          partyUuid
        }
        creditApplications {
          uuid
          partyDetails
        }
      }
    }
  }
`;

export function useGetCreditApplicationByOrderUuid(orderUuid: string) {
  return useQuery<
    GetCreditApplicationByOrderUuidDataForCreditCheck,
    GetCreditApplicationByOrderUuidDataForCreditCheckVariables
  >(GET_CREDIT_APPLICATION_BY_ORDER_UUID, {
    fetchPolicy: 'no-cache',
    variables: {
      orderUuid: orderUuid,
    },
  });
}

export const FULL_CREDIT_CHECKER_MUTATION = gql`
  mutation fullCreditChecker(
    $partyId: ID!
    $creditApplicationUuid: ID!
    $orderUuid: ID!
    $vehicleType: VehicleTypeEnum!
    $monthlyPayment: Float!
    $depositPayment: Float!
  ) {
    fullCreditChecker(
      input: {
        partyId: $partyId
        creditApplicationUuid: $creditApplicationUuid
        orderUuid: $orderUuid
        vehicleType: $vehicleType
        monthlyPayment: $monthlyPayment
        depositPayment: $depositPayment
      }
    ) {
      creditCheck {
        uuid
        creditCheckType
        creditCheckLines {
          uuid
          funder
          likelihood
        }
      }
      party {
        uuid
        person {
          uuid
          partyId
          partyUuid
          firstName
          lastName
        }
      }
    }
  }
`;

export function parseCreditApplicationData(
  creditApplicationData:
    | import('c:/Projects/Autorama/next-storefront/generated/GetCreditApplicationByOrderUuidDataForCreditCheck').GetCreditApplicationByOrderUuidDataForCreditCheck
    | undefined,
) {
  const lineItem =
    creditApplicationData?.creditApplicationByOrderUuid?.lineItem;
  const creditAppUuid = lineItem?.creditApplications?.length
    ? lineItem?.creditApplications?.[0].uuid
    : '';
  const partyUuid = lineItem?.order?.partyUuid
    ? lineItem?.order?.partyUuid
    : '';
  const vehicleType = lineItem?.vehicleProduct?.vehicleType
    ? lineItem?.vehicleProduct?.vehicleType
    : VehicleTypeEnum.CAR;
  const monthlyPayment = lineItem?.vehicleProduct?.monthlyPayment
    ? lineItem?.vehicleProduct?.monthlyPayment
    : 0;
  const depositPayment = lineItem?.vehicleProduct?.depositPayment
    ? lineItem?.vehicleProduct?.depositPayment
    : 0;
  return {
    partyUuid,
    creditAppUuid,
    vehicleType,
    monthlyPayment,
    depositPayment,
  };
}
