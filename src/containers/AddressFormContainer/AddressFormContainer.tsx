import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
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
import { historyToMoment } from '../../utils/dates';
import { IAddressFormContainerProps } from './interfaces';

const GET_ADDRESS_CONTAINER_DATA = gql`
  query GetAddressContainerDataQuery($uuid: ID!) {
    personByUuid(uuid: $uuid) {
      uuid
      partyId
    }
    allDropDowns {
      ...AddressFormDropDownData
    }
  }
  ${AddressForm.fragments.dropDownData}
`;

const SAVE_ADDRESS_HISTORY = gql`
  mutation SaveAddressHistoryMutation($input: AddressHistoryInputObject!) {
    createUpdateAddress(input: $input) {
      id
    }
  }
`;

const AddressFormContainer: React.FC<IAddressFormContainerProps> = ({
  personUuid,
  onCompleted,
}) => {
  const { loading, error, data } = useQuery<Query, QueryVariables>(
    GET_ADDRESS_CONTAINER_DATA,
    { variables: { uuid: personUuid } },
  );

  const [saveAddressHistory] = useMutation<Mutation, MutationVariables>(
    SAVE_ADDRESS_HISTORY,
    { onCompleted },
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.allDropDowns || !data.personByUuid) {
    return null;
  }

  return (
    <AddressForm
      dropDownData={data.allDropDowns}
      onSubmit={async values => {
        await saveAddressHistory({
          variables: {
            input: {
              partyId: data.personByUuid!.partyId,
              addresses: values.history.map(item => ({
                serviceId: item.address?.id,
                propertyStatus: item.status,
                startedOn: historyToMoment(item).format('YYYY-MM-DD'),
              })),
            },
          },
        });
      }}
    />
  );
};

export default AddressFormContainer;
