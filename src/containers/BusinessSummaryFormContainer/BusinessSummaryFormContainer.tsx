import { gql, useQuery } from '@apollo/client';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import BusinessSummaryForm from '../../components/BusinessSummaryForm/BusinessSummaryForm';

interface IProps {
  companyUuid: string;
  orderId: string;
  derivativeId?: string;
}

export const GET_COMPANY_SUMMARY = gql`
  query GetCompanySummaryQuery($uuid: ID!) {
    companyByUuid(uuid: $uuid) {
      ...SummaryFormCompany
    }
  }
  ${BusinessSummaryForm.fragments.company}
`;

const BusinessSummaryFormContainer: React.FC<IProps> = ({
  companyUuid,
  orderId,
  derivativeId,
}) => {
  const { data, loading, error } = useQuery<any, any>(
    GET_COMPANY_SUMMARY,
    {
      variables: {
        uuid: companyUuid,
      },
    },
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  if (!data || !data.companyByUuid) {
    return null;
  }

  return (
    <BusinessSummaryForm
      company={data.companyByUuid}
      orderId={orderId}
      derivativeId={derivativeId}
    />
  );
};

export default BusinessSummaryFormContainer;
