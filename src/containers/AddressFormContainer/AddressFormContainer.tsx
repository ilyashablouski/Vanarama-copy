import { useMutation, useQuery } from '@apollo/react-hooks';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
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
import { IAddressFormContainerProps } from './interfaces';
import { formValuesToInput, responseToInitialFormValues } from './mappers';

export const GET_ADDRESS_CONTAINER_DATA = gql`
  query GetAddressContainerDataQuery($uuid: ID!) {
    personByUuid(uuid: $uuid) {
      uuid
      partyId
      addresses {
        uuid
        serviceId
        lineOne
        lineTwo
        postcode
        city
        propertyStatus
        startedOn
      }
    }
    allDropDowns {
      ...AddressFormDropDownData
    }
  }
  ${AddressForm.fragments.dropDownData}
`;

export const SAVE_ADDRESS_HISTORY = gql`
  mutation SaveAddressHistoryMutation($input: AddressHistoryInputObject!) {
    createUpdateAddress(input: $input) {
      uuid
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
      dropDownData={data.allDropDowns}
      initialValues={responseToInitialFormValues(data)}
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

export default AddressFormContainer;
