import { useMutation, gql, useQuery } from '@apollo/client';

import {
  UpdateBankDetailsMutation as Mutation,
  UpdateBankDetailsMutationVariables as MutationVariables,
} from '../../../generated/UpdateBankDetailsMutation';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import CompanyBankDetails from '../../components/CompanyBankDetails';
import {
  GetCompanyBankDetailsPageDataQuery as Query,
  GetCompanyBankDetailsPageDataQueryVariables as QueryVariables,
} from '../../../generated/GetCompanyBankDetailsPageDataQuery';

export const UPDATE_COMPANY_BANK_DETAILS = gql`
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

export const GET_COMPANY_BANK_DETAILS = gql`
  query GetCompanyBankDetailsPageDataQuery($uuid: ID!) {
    companyByUuid(uuid: $uuid) {
      uuid,
      bankAccounts {
        uuid
        accountName
        accountNumber
        sortCode
        joinedAt
      }
    }
  }
`;

export function useBankDetails(companyUuid: string) {
  return useQuery<Query, QueryVariables>(GET_COMPANY_BANK_DETAILS, {
    variables: { uuid: companyUuid },
  });
}

export function useUpdateBankDetails(
  companyUuid: string,
  onCompleted: () => void,
) {
  return useMutation<Mutation, MutationVariables>(UPDATE_COMPANY_BANK_DETAILS, {
    onCompleted,
    update: (store, result) => {
      // Read the data from our cache for this query.
      const data = store.readQuery<Query, QueryVariables>({
        query: UPDATE_COMPANY_BANK_DETAILS,
        variables: { uuid: companyUuid },
      });

      // Update the person's bank details.
      if (data?.companyByUuid) {
        const bankAccounts = result.data?.updateLimitedCompany
          ? [result.data?.updateLimitedCompany]
          : null;

        // Write our data back to the cache.
        store.writeQuery<Query, QueryVariables>({
          query: GET_COMPANY_BANK_DETAILS,
          variables: { uuid: companyUuid },
          data: {
            ...data,
            // companyByUuid: {
            //   ...data.companyByUuid,
            //   // bankAccounts,
            // },
          },
        });
      }
    },
  });
}


export function useUpdateBankDetails1(
  companyUuid: string,
  onCompleted: () => void,
) {
  return useMutation<Mutation, MutationVariables>(UPDATE_COMPANY_BANK_DETAILS, {
    onCompleted,
    update: (store, result) => {
      // Read the data from our cache for this query.
      const data = store.readQuery<Query, QueryVariables>({
        query: GET_COMPANY_BANK_DETAILS,
        variables: { uuid: companyUuid },
      });

      // Update the company's bank details.
      if (data?.companyByUuid) {
        const bankAccounts = result.data?.updateLimitedCompany?.bankAccounts?.length
          ? [result.data?.updateLimitedCompany.bankAccounts[0]]
          : null;

        // Write our data back to the cache.
        store.writeQuery<Query, QueryVariables>({
          query: UPDATE_COMPANY_BANK_DETAILS,
          variables: { uuid: companyUuid },
          data
          // data: {
          //   ...data,
          //   companyByUuid: {
          //     ...data.companyByUuid,
          //     bankAccounts,
          //   },
          // },
        });
      }
    },
  });
}/* {
  const [updateBankDetails] = useMutation<Mutation, MutationVariables>(
    UPDATE_COMPANY_BANK_DETAILS,
    {
      onError: () =>
        toast.error(
          'Oops, an unexpected error occurred',
          'Your details could not be saved. Please try submitting the form again.',
        ),
      onCompleted: ()=> {
        console.log('updated');
        onCompleted();
      }
    },
  );

  return updateBankDetails;
} */
