import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
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
import { historyToMoment } from '../../utils/dates';
import { IEmploymentFormContainerProps } from './interfaces';

export const GET_EMPLOYMENT_CONTAINER_DATA = gql`
  query GetEmploymentContainerDataQuery($id: ID!) {
    personById(id: $id) {
      id
      partyId
    }
    allDropDowns {
      ...EmploymentFormDropDownData
    }
  }
  ${EmploymentForm.fragments.dropDownData}
`;

export const SAVE_EMPLOYMENT_HISTORY = gql`
  mutation SaveEmploymentHistoryMutation(
    $input: EmploymentHistoryInputObject!
  ) {
    createUpdateEmploymentHistory(input: $input) {
      id
    }
  }
`;

const EmploymentFormContainer: React.FC<IEmploymentFormContainerProps> = ({
  personId,
  onCompleted,
}) => {
  const { loading, error, data } = useQuery<Query, QueryVariables>(
    GET_EMPLOYMENT_CONTAINER_DATA,
    { variables: { id: personId } },
  );

  const [saveEmploymentHistory] = useMutation<Mutation, MutationVariables>(
    SAVE_EMPLOYMENT_HISTORY,
    { onCompleted },
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.allDropDowns || !data.personById) {
    return null;
  }

  return (
    <EmploymentForm
      dropDownData={data.allDropDowns}
      onSubmit={async values => {
        await saveEmploymentHistory({
          variables: {
            input: {
              partyId: data.personById?.partyId!,
              employmentHistories: values.history.map(item => ({
                companyAddressServiceId: item.address?.id || undefined,
                companyName: item.company || undefined,
                contract: item.contract || undefined,
                employedSinceDate: historyToMoment(item).format('YYYY-MM-DD'),
                employmentStatus: item.status || undefined,
                grossAnnualIncome: Number(item.income) || undefined,
                jobTitle: item.title || undefined,
                workPhoneNumber: item.phoneNumber || undefined,
              })),
            },
          },
        });
      }}
    />
  );
};

export default EmploymentFormContainer;
