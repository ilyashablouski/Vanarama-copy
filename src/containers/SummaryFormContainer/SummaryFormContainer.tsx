import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import SummaryForm from '../../components/SummaryForm/SummaryForm';
import {
  GetPersonSummaryQuery as Query,
  GetPersonSummaryQueryVariables as QueryVariables,
} from '../../../generated/GetPersonSummaryQuery';

interface IProps {
  personUuid: string;
}

export const GET_PERSON_SUMMARY = gql`
  query GetPersonSummaryQuery($uuid: ID!) {
    personByUuid(uuid: $uuid) {
      ...SummaryFormPerson
    }
  }
  ${SummaryForm.fragments.person}
`;

const SummaryFormContainer: React.FC<IProps> = ({ personUuid }) => {
  const { data, loading, error } = useQuery<Query, QueryVariables>(
    GET_PERSON_SUMMARY,
    {
      variables: {
        uuid: personUuid,
      },
    },
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  if (!data || !data.personByUuid) {
    return null;
  }

  return <SummaryForm person={data.personByUuid} />;
};

export default SummaryFormContainer;
