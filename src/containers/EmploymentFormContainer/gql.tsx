import { useMutation, useQuery, gql } from '@apollo/client';

import {
  GetEmploymentContainerDataQuery as Query,
  GetEmploymentContainerDataQueryVariables as QueryVariables,
} from '../../../generated/GetEmploymentContainerDataQuery';
import {
  SaveEmploymentHistoryMutation as Mutation,
  SaveEmploymentHistoryMutationVariables as MutationVariables,
} from '../../../generated/SaveEmploymentHistoryMutation';
import EmploymentForm from '../../components/EmploymentForm/EmploymentForm';

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

export function useEmploymentData(personUuid: string) {
  return useQuery<Query, QueryVariables>(GET_EMPLOYMENT_CONTAINER_DATA, {
    variables: {
      uuid: personUuid,
    },
  });
}

export function useUpdateEmployment(
  personByUuid: string,
  onCompleted: (data: Mutation) => void,
) {
  return useMutation<Mutation, MutationVariables>(SAVE_EMPLOYMENT_HISTORY, {
    onCompleted,
    update: (store, result) => {
      // Read the data from our cache for this query.
      const data = store.readQuery<Query, QueryVariables>({
        query: GET_EMPLOYMENT_CONTAINER_DATA,
        variables: { uuid: personByUuid },
      });

      // Add the employment from the mutation to the end.
      if (data?.personByUuid) {
        const employmentHistories =
          result.data?.createUpdateEmploymentHistory || [];

        // Write our data back to the cache.
        store.writeQuery<Query, QueryVariables>({
          query: GET_EMPLOYMENT_CONTAINER_DATA,
          variables: { uuid: personByUuid },
          data: {
            ...data,
            personByUuid: {
              ...data.personByUuid,
              employmentHistories,
            },
          },
        });
      }
    },
  });
}
