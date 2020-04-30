import { useMutation, useQuery } from '@apollo/react-hooks';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { gql, MutationUpdaterFn } from 'apollo-boost';
import React from 'react';
import {
  GetAddressContainerDataQuery as Query,
  GetAddressContainerDataQueryVariables as QueryVariables,
} from '../../../generated/GetAddressContainerDataQuery';
import {
  SaveAddressHistoryMutation as Mutation,
  SaveAddressHistoryMutationVariables as MutationVariables,
} from '../../../generated/SaveAddressHistoryMutation';
import AddressForm from '../../components/AddressForm/AddressForm';
import { IAddressFormContainerProps } from './interfaces';
import { formValuesToInput } from './mappers';

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

const AddressFormContainer: React.FC<IAddressFormContainerProps> = ({
  personUuid,
  onCompleted,
}) => {
  const { loading, error, data } = useQuery<Query, QueryVariables>(
    GET_ADDRESS_CONTAINER_DATA,
    {
      variables: {
        uuid: personUuid,
      },
    },
  );

  const [saveAddressHistory] = useMutation<Mutation, MutationVariables>(
    SAVE_ADDRESS_HISTORY,
    {
      onCompleted,
      update: updateCache(personUuid),
    },
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.allDropDowns || !data.personByUuid) {
    return <p>Address details cannot be found</p>;
  }

  return (
    <AddressForm
      addresses={data.personByUuid.addresses || []}
      dropDownData={data.allDropDowns}
      onSubmit={values =>
        saveAddressHistory({
          variables: {
            input: formValuesToInput(data.personByUuid!.partyId, values),
          },
        })
      }
    />
  );
};

function updateCache(uuid: string) {
  const updater: MutationUpdaterFn<Mutation> = (store, result) => {
    // Read the data from our cache for this query.
    const data = store.readQuery<Query, QueryVariables>({
      query: GET_ADDRESS_CONTAINER_DATA,
      variables: { uuid },
    });

    // Add the addresses from the mutation to the end.
    if (data?.personByUuid?.addresses) {
      data.personByUuid.addresses = result.data?.createUpdateAddress || [];

      // Write our data back to the cache.
      store.writeQuery<Query, QueryVariables>({
        query: GET_ADDRESS_CONTAINER_DATA,
        variables: { uuid },
        data,
      });
    }
  };

  return updater;
}

export default AddressFormContainer;
