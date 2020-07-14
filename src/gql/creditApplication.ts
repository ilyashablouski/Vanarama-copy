import { useQuery, gql, useMutation } from '@apollo/client';
import {
  CreateUpdateCreditApplication,
  CreateUpdateCreditApplicationVariables,
} from '../../generated/CreateUpdateCreditApplication';
import {
  GetCreditApplicationByOrderUuid as Query,
  GetCreditApplicationByOrderUuidVariables as QueryVariables,
} from '../../generated/GetCreditApplicationByOrderUuid';

export const GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA = gql`
  query GetCreditApplicationByOrderUuid($id: ID!) {
    creditApplicationByOrderUuid(orderUuid: $id) {
      addresses
      bankAccounts
      employmentHistories
      incomeAndExpenses
      lineItem {
        uuid
        quantity
        status
        productId
        productType
        vehicleProduct {
          derivativeCapId
          description
          vsku
          term
          annualMileage
          monthlyPayment
          depositMonths
          funder
        }
      }
      leadManagerProposalId
      createdAt
      emailAddresses
      partyDetails
      status
      telephoneNumbers
      updatedAt
      uuid
    }
  }
`;

export function useGetCreditApplicationByOrderUuid(id: string) {
  return useQuery<Query, QueryVariables>(
    GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA,
    {
      variables: {
        id,
      },
    },
  );
}

export const CREATE_UPDATE_CREDIT_APPLICATION = gql`
  mutation CreateUpdateCreditApplication(
    $input: CreditApplicationInputObject!
  ) {
    createUpdateCreditApplication(input: $input) {
      addresses
      bankAccounts
      employmentHistories
      incomeAndExpenses
      lineItem {
        uuid
        quantity
        status
        productId
        productType
        vehicleProduct {
          derivativeCapId
          description
          vsku
          term
          annualMileage
          monthlyPayment
          depositMonths
          funder
        }
      }
      leadManagerProposalId
      createdAt
      emailAddresses
      partyDetails
      status
      telephoneNumbers
      updatedAt
      uuid
    }
  }
`;

export function useCreateUpdateCreditApplication(
  orderId: string,
  onCompleted: (data: CreateUpdateCreditApplication) => void,
) {
  return useMutation<
    CreateUpdateCreditApplication,
    CreateUpdateCreditApplicationVariables
  >(CREATE_UPDATE_CREDIT_APPLICATION, {
    onCompleted,
    update: (store, result) => {
      // Read the data from our cache for this query.
      const data = store.readQuery<Query, QueryVariables>({
        query: GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA,
        variables: { id: orderId },
      });

      // Add the employment from the mutation to the end.
      if (
        data?.creditApplicationByOrderUuid ||
        result.data?.createUpdateCreditApplication
      ) {
        const addresses =
          result.data?.createUpdateCreditApplication?.addresses ||
          data?.creditApplicationByOrderUuid?.addresses;
        const bankAccounts =
          result.data?.createUpdateCreditApplication?.bankAccounts ||
          data?.creditApplicationByOrderUuid?.bankAccounts;
        const emailAddresses =
          result.data?.createUpdateCreditApplication?.emailAddresses ||
          data?.creditApplicationByOrderUuid?.emailAddresses;
        const employmentHistories =
          result.data?.createUpdateCreditApplication?.employmentHistories ||
          data?.creditApplicationByOrderUuid?.employmentHistories;
        const incomeAndExpenses =
          result.data?.createUpdateCreditApplication?.incomeAndExpenses ||
          data?.creditApplicationByOrderUuid?.incomeAndExpenses;
        const status =
          result.data?.createUpdateCreditApplication?.status ||
          data?.creditApplicationByOrderUuid?.status;
        const telephoneNumbers =
          result.data?.createUpdateCreditApplication?.telephoneNumbers ||
          data?.creditApplicationByOrderUuid?.telephoneNumbers;
        const updatedAt =
          result.data?.createUpdateCreditApplication?.updatedAt ||
          data?.creditApplicationByOrderUuid?.updatedAt;

        // Write our data back to the cache.
        store.writeQuery<Query, QueryVariables>({
          query: GET_CREDIT_APPLICATION_BY_ORDER_UUID_DATA,
          variables: { id: orderId },
          data: {
            creditApplicationByOrderUuid: {
              createdAt: data?.creditApplicationByOrderUuid?.createdAt,
              addresses,
              bankAccounts,
              emailAddresses,
              employmentHistories,
              incomeAndExpenses,
              lineItem: null,
              status: status || 'draft',
              telephoneNumbers,
              updatedAt,
              uuid: orderId,
              partyDetails: null,
              leadManagerProposalId: null,
            },
          },
        });
      }
    },
  });
}
