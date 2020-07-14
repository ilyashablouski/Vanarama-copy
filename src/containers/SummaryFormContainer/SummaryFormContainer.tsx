import { gql, useQuery } from '@apollo/client';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import {
  GetPersonSummaryQuery as Query,
  GetPersonSummaryQueryVariables as QueryVariables,
} from '../../../generated/GetPersonSummaryQuery';
import SummaryForm from '../../components/SummaryForm/SummaryForm';

interface IProps {
  personUuid: string;
  orderId: string;
}

export const GET_PERSON_SUMMARY = gql`
  query GetPersonSummaryQuery($uuid: ID!) {
    personByUuid(uuid: $uuid) {
      ...SummaryFormPerson
    }
  }
  ${SummaryForm.fragments.person}
`;

const SummaryFormContainer: React.FC<IProps> = ({ personUuid, orderId }) => {
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

  return <SummaryForm person={data.personByUuid} orderId={orderId} />;
};

export default SummaryFormContainer;
