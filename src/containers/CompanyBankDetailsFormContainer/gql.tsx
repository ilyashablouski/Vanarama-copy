import { useMutation, useQuery, gql } from '@apollo/client';

import {
  CreateUpdateBankAccountMutation as Mutation,
  UpdateBankDetailsMutationVariables as MutationVariables,

export const UPDATE_BANK_DETAILS = gql`
  mutation UpdateBankDetailsMutation($input: LimitedCompanyInputObject!) {
    updateLimitedCompany(input: $input) {
      uuid
      bankAccounts{
        accountName
        accountNumber
        sortCode
        joinedAt
      }
    }
  }
`;

// type QueryParams = OLAFQueryParams & {
//   companyUuid: string;
// };

export function useUpdateBankDetails(
  companyUuid: string,
  onCompleted: () => void,
) {
  // const router = useRouter();
  // const { companyUuid, derivativeId, orderId } = router.query as QueryParams;
  const [updateBankDetails] = useMutation<Mutation, MutationVariables>(
    UPDATE_BANK_DETAILS,
    {
      onError: () =>
        toast.error(
          'Oops, an unexpected error occurred',
          'Your details could not be saved. Please try submitting the form again.',
        ),
      onCompleted
    },
  );

  return updateBankDetails;
}

// export const GET_BANK_DETAILS_PAGE_DATA = gql`
//   query GetCompanyBankDetailsPageDataQuery($uuid: ID!) {
//     personByUuid(uuid: $uuid) {
//       uuid
//       partyId
//       bankAccounts {
//         ...BankDetailsAccount
//       }
//     }
//   }
//   ${CompanyBankDetails.fragments.account}
// `;

// export const CREATE_UPDATE_BANK_ACCOUNT = gql`
//   mutation CreateCompanyUpdateBankAccountMutation($input: BankAccountInputObject) {
//     createUpdateBankAccount(input: $input) {
//       ...BankDetailsAccount
//     }
//   }
//   ${CompanyBankDetails.fragments.account}
// `;

// export function useBankDetails(personUuid: string) {
//   return useQuery<Query, QueryVariables>(GET_BANK_DETAILS_PAGE_DATA, {
//     variables: { uuid: personUuid },
//   });
// }

// export function useUpdateBankDetails(
//   personUuid: string,
//   onCompleted: () => void,
// ) {
//   return useMutation<Mutation, MutationVariables>(CREATE_UPDATE_BANK_ACCOUNT, {
//     onCompleted,
//     update: (store, result) => {
//       // Read the data from our cache for this query.
//       const data = store.readQuery<Query, QueryVariables>({
//         query: GET_BANK_DETAILS_PAGE_DATA,
//         variables: { uuid: personUuid },
//       });

//       // Update the person's bank details.
//       if (data?.personByUuid) {
//         const bankAccounts = result.data?.createUpdateBankAccount
//           ? [result.data?.createUpdateBankAccount]
//           : null;

//         // Write our data back to the cache.
//         store.writeQuery<Query, QueryVariables>({
//           query: GET_BANK_DETAILS_PAGE_DATA,
//           variables: { uuid: personUuid },
//           data: {
//             ...data,
//             personByUuid: {
//               ...data.personByUuid,
//               bankAccounts,
//             },
//           },
//         });
//       }
//     },
//   });
// }
