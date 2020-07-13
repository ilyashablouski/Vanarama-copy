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
  orderId?: string;
  derivativeId?: string;
}

export const GET_PERSON_SUMMARY = gql`
  query GetPersonSummaryQuery($uuid: ID!) {
    personByUuid(uuid: $uuid) {
      ...SummaryFormPerson
    }
  }
  ${SummaryForm.fragments.person}
`;

const SummaryFormContainer: React.FC<IProps> = ({
  personUuid,
  orderId,
  derivativeId,
}) => {
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

  return (
    <SummaryForm
      person={data.personByUuid}
      orderId={orderId}
      derivativeId={derivativeId}
    />
  );
};

export default SummaryFormContainer;
