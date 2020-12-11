import dynamic from 'next/dynamic';
import { gql, useQuery } from '@apollo/client';
import React from 'react';
import {
  GetPersonSummaryQuery as Query,
  GetPersonSummaryQueryVariables as QueryVariables,
} from '../../../generated/GetPersonSummaryQuery';
import SummaryForm from '../../components/SummaryForm/SummaryForm';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/loading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IProps {
  personUuid: string;
  orderId: string;
  onComplete?: (emailAddress: string) => void;
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
  onComplete,
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

  const { personByUuid } = data;
  return (
    <SummaryForm
      onComplete={() => onComplete?.(personByUuid?.emailAddresses[0].value)}
      person={personByUuid}
      orderId={orderId}
    />
  );
};

export default SummaryFormContainer;
