import { gql, useMutation } from '@apollo/client';

export const CREATE_UPDATE_CREDIT_APPLICATION_MUTATION = gql`
  mutation CreateUpdateCreditApplication(
    $orderUuid: ID!,
    $addresses: json,
    $addresses: json,
    $bankAccounts: json,
    $emailAddresses: json,
    $incomeAndExpenses: json,
    // $partyDetails: json,
    $telephoneNumbers: json,
  ) {
    createUpdateCreditApplication(
      input: {
        orderUuid: $orderUuid
        addresses: $addresses
        bankAccounts: $bankAccounts
        emailAddresses: $emailAddresses
        incomeAndExpenses: $incomeAndExpenses
        partyDetails: $partyDetails
        telephoneNumbers: $telephoneNumbers
      }
    )
  }
`;

export function useCreateUpdateApplication(onCompleted, onError) {
  return useMutation(CREATE_UPDATE_CREDIT_APPLICATION_MUTATION, {
    onCompleted,
    onError,
  });
}
