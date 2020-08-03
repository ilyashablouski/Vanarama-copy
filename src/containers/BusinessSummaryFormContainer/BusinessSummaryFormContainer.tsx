import { gql, useQuery } from '@apollo/client';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import BusinessSummaryForm from '../../components/BusinessSummaryForm/BusinessSummaryForm';
import AboutForm from '../../components/AboutForm';
import {
  GetCompanySummaryQuery,
  GetCompanySummaryQueryVariables,
} from '../../../generated/GetCompanySummaryQuery';

export const GET_COMPANY_SUMMARY = gql`
  query GetCompanySummaryQuery($uuid: ID!, $personUuid: ID!) {
    companyByUuid(uuid: $uuid) {
      ...SummaryFormCompany
    }
    personByUuid(uuid: $personUuid) {
      ...AboutFormPerson
    }
  }
  ${BusinessSummaryForm.fragments.company}
  ${AboutForm.fragments.person}
`;

interface IProps {
  personUuid: string;
  companyUuid: string;
  orderId: string;
}

const BusinessSummaryFormContainer: React.FC<IProps> = ({
  companyUuid,
  orderId,
  personUuid,
}) => {
  const { data, loading, error } = useQuery<
    GetCompanySummaryQuery,
    GetCompanySummaryQueryVariables
  >(GET_COMPANY_SUMMARY, {
    variables: {
      uuid: companyUuid,
      personUuid,
    },
  });

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  if (!data || !data.companyByUuid || !data.personByUuid) {
    return null;
  }

  return (
    <BusinessSummaryForm
      person={data.personByUuid}
      company={data.companyByUuid}
      orderId={orderId}
    />
  );
};

export default BusinessSummaryFormContainer;
