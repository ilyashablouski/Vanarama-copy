import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  GetAddressContainerDataQuery as Query,
  GetAddressContainerDataQueryVariables as QueryVariables,
} from '../../../generated/GetAddressContainerDataQuery';
import {
  SaveAddressHistoryMutation as Mutation,
  SaveAddressHistoryMutationVariables as MutationVariables,
} from '../../../generated/SaveAddressHistoryMutation';
import AddressForm from '../../components/AddressForm/AddressForm';

export const GET_ADDRESS_CONTAINER_DATA = gql`
  query GetAddressContainerDataQuery($uuid: ID!) {
    personByUuid(uuid: $uuid) {
      uuid
      partyId
      addresses {
        ...AddressFormAddresses
      }
    }
    allDropDowns {
      ...AddressFormDropDownData
    }
  }
  ${AddressForm.fragments.addresses}
  ${AddressForm.fragments.dropDownData}
`;

export const SAVE_ADDRESS_HISTORY = gql`
  mutation SaveAddressHistoryMutation($input: AddressHistoryInputObject!) {
    createUpdateAddress(input: $input) {
      ...AddressFormAddresses
    }
  }
  ${AddressForm.fragments.addresses}
`;

export function useAddressData(personUuid: string) {
  return useQuery<Query, QueryVariables>(GET_ADDRESS_CONTAINER_DATA, {
    variables: {
      uuid: personUuid,
    },
  });
}

export function useUpdateAddresses(
  personUuid: string,
  onCompleted: (data: Mutation) => void,
) {
  return useMutation<Mutation, MutationVariables>(SAVE_ADDRESS_HISTORY, {
    onCompleted,
    update: (store, result) => {
      // Read the data from our cache for this query.
      const data = store.readQuery<Query, QueryVariables>({
        query: GET_ADDRESS_CONTAINER_DATA,
        variables: { uuid: personUuid },
      });

      // Add the addresses from the mutation to the end.
      if (data?.personByUuid) {
        data.personByUuid.addresses = result.data?.createUpdateAddress || [];

        // Write our data back to the cache.
        store.writeQuery<Query, QueryVariables>({
          query: GET_ADDRESS_CONTAINER_DATA,
          variables: { uuid: personUuid },
          data,
        });
      }
    },
  });
}
