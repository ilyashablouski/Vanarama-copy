import { gql, useQuery, useMutation } from '@apollo/client';
import { NextRouter } from 'next/router';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  GetCreditApplicationByOrderUuidDataForCreditCheckVariables,
  GetCreditApplicationByOrderUuidDataForCreditCheck,
} from '../../../generated/GetCreditApplicationByOrderUuidDataForCreditCheck';

import {
  fullCreditChecker,
  fullCreditCheckerVariables,
} from '../../../generated/fullCreditChecker';

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

export function useGetCreditApplicationByOrderUuid(
  shouldExecute: boolean,
  orderUuid: string,
) {
  return useQuery<
    GetCreditApplicationByOrderUuidDataForCreditCheck,
    GetCreditApplicationByOrderUuidDataForCreditCheckVariables
  >(GET_CREDIT_APPLICATION_BY_ORDER_UUID, {
    fetchPolicy: 'no-cache',
    variables: {
      orderUuid,
    },
    skip: !shouldExecute,
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

const PLACEHOLDER_MUTATION = gql`
  mutation {
    whatever
  }
`;

export function useCallFullCreditChecker(
  continuePressed: boolean,
  creditApplicationData:
    | GetCreditApplicationByOrderUuidDataForCreditCheck
    | undefined,
  orderId: string,
  router: NextRouter,
) {
  let mutationText = PLACEHOLDER_MUTATION;
  let onCompletedFunction = () => {};
  if (continuePressed) {
    mutationText = FULL_CREDIT_CHECKER_MUTATION;
    onCompletedFunction = () => {
      router.push(
        '/olaf/thank-you/[orderId]',
        '/olaf/thank-you/[orderId]'.replace('[orderId]', orderId),
      );
    };
  }

  const [useFullCreditChecker] = useMutation<
    fullCreditChecker,
    fullCreditCheckerVariables
  >(mutationText, {
    onCompleted: onCompletedFunction,
  });
  const {
    partyUuid,
    creditAppUuid,
    vehicleType,
    monthlyPayment,
    depositPayment,
  } = parseCreditApplicationData(creditApplicationData);

  return useFullCreditChecker({
    variables: {
      partyId: partyUuid,
      creditApplicationUuid: creditAppUuid,
      orderUuid: orderId,
      vehicleType,
      monthlyPayment,
      depositPayment,
    },
  });
}

export function parseCreditApplicationData(
  creditApplicationData:
    | GetCreditApplicationByOrderUuidDataForCreditCheck
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
