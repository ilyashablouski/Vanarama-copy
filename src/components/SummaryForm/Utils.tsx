// import {
//   FulCreditCheckerMutation,
//   FulCreditCheckerMutationVariables,
// } from '../../../generated/FulCreditCheckerMutation';
import { gql, useMutation } from '@apollo/client';
import useImperativeQuery from 'hooks/useImperativeQuery';
import { useGetCreditApplicationByOrderUuid } from 'gql/creditApplication';

// export const GET_CREDIT_APPLICATION_BY_ORDER_UUID = gql`
//   query GetCreditApplicationByOrderUuidData($orderUuid: ID!) {
//     creditApplicationByOrderUuid(orderUuid: $orderUuid) {
//       lineItem {
//         vehicleProduct {
//           vehicleType
//           depositPayment
//           monthlyPayment
//         }
//         order {
//           partyUuid
//         }
//         creditApplications {
//           uuid
//           partyDetails
//         }
//       }
//     }
//   }
// `;
// const getCreditApplicationByOrderUuid = useImperativeQuery(
//   GET_CREDIT_APPLICATION_BY_ORDER_UUID,
// );

export const FULL_CREDIT_CHECKER_MUTATION = gql`
  mutation fullCreditChecker(
   
    $partyId: String!
    $creditApplicationUuid: String!
    $orderUuid: String,
    $vehicleType: VehicleTypeEnum!
    $monthlyPayment: Float!
    $depositPayment: Float!
    }
  ){
    fullCreditChecker(
      input: {
     partyId: $partyId, 
     creditApplicationUuid: $creditApplicationUuid,
     orderUuid: $orderUuid,
     vehicleType: $vehicleType,
     monthlyPayment: $monthlyPayment,
     depositPayment: $depositPayment
         }){
		        creditCheck{
            uuid
            creditCheckType
            creditCheckLines{
              uuid
              funder
              likelihood
              }
            }
          party{
            uuid
            person{
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

function useFullCreditChecker(
  onCompleted?: (data: FulCreditCheckerMutation) => void,
) {
  return useMutation<
    FulCreditCheckerMutation,
    FulCreditCheckerMutationVariables
  >(FULL_CREDIT_CHECKER_MUTATION, { onCompleted });
}

export function callfullCreditChecker(orderUuid: string) {
  // const creditApplication = useGetCreditApplicationByOrderUuid(orderUuid);
  // useFullCreditChecker();
  // debugger;
  // getCreditApplicationByOrderUuid({
  //   partyUuid: orderUuid,
  // }).then(response => {
  //   const resp = response;
  //   useFullCreditChecker();
  // });
  // $orderUuid: String,

  //creditApplicationByOrderUuid(orderUuid: ID!)
  // $partyId: String!

  // $creditApplicationUuid: String!
  // $monthlyPayment: Float!
  // $depositPayment: Float!

  // $vehicleType: VehicleTypeEnum!
  // $monthlyPayment: Float!
  // $depositPayment: Float!
}

// function useFullCreditChecker1(
//   onCompleted?: (data: FulCreditCheckerMutation) => void,
// ) {
//   return useMutation<FulCreditCheckerMutation, FulCreditCheckerMutationVariables>(
//     FULL_CREDIT_CHECKER_MUTATION,
//     { onCompleted },
//   );
// }

// enum VehicleTypeEnum {
//   Car,
//   LCV,
// }
