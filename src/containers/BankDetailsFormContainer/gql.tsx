import { useMutation, useQuery, gql } from '@apollo/client';

import {
  CreateUpdateBankAccountMutation as Mutation,
  CreateUpdateBankAccountMutationVariables as MutationVariables,
} from '../../../generated/CreateUpdateBankAccountMutation';
import {
  GetBankDetailsPageDataQuery as Query,
  GetBankDetailsPageDataQueryVariables as QueryVariables,
} from '../../../generated/GetBankDetailsPageDataQuery';
import BankDetails from '../../components/BankDetails';

export const GET_BANK_DETAILS_PAGE_DATA = gql`
  query GetBankDetailsPageDataQuery($uuid: ID!) {
    personByUuid(uuid: $uuid) {
      uuid
      partyId
      emailAddresses {
        uuid
        value
        primary
        kind
        partyId
      }
      bankAccounts {
        ...BankDetailsAccount
      }
    }
  }
  ${BankDetails.fragments.account}
`;

export const CREATE_UPDATE_BANK_ACCOUNT = gql`
  mutation CreateUpdateBankAccountMutation($input: BankAccountInputObject) {
    createUpdateBankAccount(input: $input) {
      ...BankDetailsAccount
    }
  }
  ${BankDetails.fragments.account}
`;

export function useBankDetails(personUuid: string) {
  return useQuery<Query, QueryVariables>(GET_BANK_DETAILS_PAGE_DATA, {
    variables: { uuid: personUuid },
  });
}

export function useUpdateBankDetails(
  personUuid: string,
  onCompleted: (data: Mutation) => void,
) {
  return useMutation<Mutation, MutationVariables>(CREATE_UPDATE_BANK_ACCOUNT, {
    onCompleted,
    update: (store, result) => {
      // Read the data from our cache for this query.
      const data = store.readQuery<Query, QueryVariables>({
        query: GET_BANK_DETAILS_PAGE_DATA,
        variables: { uuid: personUuid },
      });

      // Update the person's bank details.
      if (data?.personByUuid) {
        const bankAccounts = result.data?.createUpdateBankAccount
          ? [result.data?.createUpdateBankAccount]
          : null;

        // Write our data back to the cache.
        store.writeQuery<Query, QueryVariables>({
          query: GET_BANK_DETAILS_PAGE_DATA,
          variables: { uuid: personUuid },
          data: {
            ...data,
            personByUuid: {
              ...data.personByUuid,
              bankAccounts,
            },
          },
        });
      }
    },
  });
}
