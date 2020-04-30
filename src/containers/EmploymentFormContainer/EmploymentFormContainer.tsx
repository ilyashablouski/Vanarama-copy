import { useMutation, useQuery } from '@apollo/react-hooks';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { gql, MutationUpdaterFn } from 'apollo-boost';
import React from 'react';
import {
  GetEmploymentContainerDataQuery as Query,
  GetEmploymentContainerDataQueryVariables as QueryVariables,
} from '../../../generated/GetEmploymentContainerDataQuery';
import {
  SaveEmploymentHistoryMutation as Mutation,
  SaveEmploymentHistoryMutationVariables as MutationVariables,
} from '../../../generated/SaveEmploymentHistoryMutation';
import EmploymentForm from '../../components/EmploymentForm/EmploymentForm';
import { IEmploymentFormContainerProps } from './interfaces';
import { formValuesToInput } from './mappers';

export const GET_EMPLOYMENT_CONTAINER_DATA = gql`
  query GetEmploymentContainerDataQuery($uuid: ID!) {
    personByUuid(uuid: $uuid) {
      uuid
      partyId
      employmentHistories {
        ...EmploymentFormEmployment
      }
    }
    allDropDowns {
      ...EmploymentFormDropDownData
    }
  }
  ${EmploymentForm.fragments.dropDownData}
  ${EmploymentForm.fragments.employments}
`;

export const SAVE_EMPLOYMENT_HISTORY = gql`
  mutation SaveEmploymentHistoryMutation(
    $input: EmploymentHistoryInputObject!
  ) {
    createUpdateEmploymentHistory(input: $input) {
      ...EmploymentFormEmployment
    }
  }
  ${EmploymentForm.fragments.employments}
`;

const EmploymentFormContainer: React.FC<IEmploymentFormContainerProps> = ({
  personUuid,
  onCompleted,
}) => {
  const { loading, error, data } = useQuery<Query, QueryVariables>(
    GET_EMPLOYMENT_CONTAINER_DATA,
    {
      variables: {
        uuid: personUuid,
      },
    },
  );

  const [saveEmploymentHistory] = useMutation<Mutation, MutationVariables>(
    SAVE_EMPLOYMENT_HISTORY,
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
    return null;
  }

  return (
    <EmploymentForm
      dropDownData={data.allDropDowns}
      employments={data.personByUuid.employmentHistories || []}
      onSubmit={values =>
        saveEmploymentHistory({
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
      query: GET_EMPLOYMENT_CONTAINER_DATA,
      variables: { uuid },
    });

    // Add the employment from the mutation to the end.
    if (data?.personByUuid?.employmentHistories) {
      data.personByUuid.employmentHistories =
        result.data?.createUpdateEmploymentHistory || [];

      // Write our data back to the cache.
      store.writeQuery<Query, QueryVariables>({
        query: GET_EMPLOYMENT_CONTAINER_DATA,
        variables: { uuid },
        data,
      });
    }
  };

  return updater;
}

export default EmploymentFormContainer;
