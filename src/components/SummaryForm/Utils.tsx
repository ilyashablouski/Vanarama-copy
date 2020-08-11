import {
  FulCreditCheckerMutation,
  FulCreditCheckerMutationVariables,
} from '../../../generated/FulCreditCheckerMutation';
import { gql, useMutation } from '@apollo/client';

export function callfullCreditChecker(orderId: string) {
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


export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUserMutation(
    $firstName: String!
    $lastName: String!
    $username: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
    ) {
      uuid
    }
  }
`;

function useFullCreditChecker(
  onCompleted?: (data: FulCreditCheckerMutation) => void,
) {
  return useMutation<FulCreditCheckerMutation, FulCreditCheckerMutationVariables>(
    FULL_CREDIT_CHECKER_MUTATION,
    { onCompleted },
  );
}
function useFullCreditChecker(
  onCompleted?: (data: FulCreditCheckerMutation) => void,
) {
  return useMutation<FulCreditCheckerMutation, FulCreditCheckerMutationVariables>(
    FULL_CREDIT_CHECKER_MUTATION,
    { onCompleted },
  );
}


enum VehicleTypeEnum {
  Car,
  LCV
}
