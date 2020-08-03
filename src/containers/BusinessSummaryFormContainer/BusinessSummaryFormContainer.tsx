import { useQuery } from '@apollo/client';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import BusinessSummaryForm from '../../components/BusinessSummaryForm/BusinessSummaryForm';
import {
  GetCompanySummaryQuery,
  GetCompanySummaryQueryVariables,
} from '../../../generated/GetCompanySummaryQuery';
import { GET_COMPANY_SUMMARY } from './gql';

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
