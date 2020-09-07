import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import BusinessSummaryForm from '../../components/BusinessSummaryForm/BusinessSummaryForm';
import {
  GetCompanySummaryQuery,
  GetCompanySummaryQueryVariables,
  GetCompanySummaryQuery_personByUuid as PersonByUuid,
  GetCompanySummaryQuery_companyByUuid as CompanyByUuid,
} from '../../../generated/GetCompanySummaryQuery';
import { GET_COMPANY_SUMMARY } from './gql';
import { useGetCreditApplicationByOrderUuid } from '../../gql/creditApplication';

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
  const [getDataSummary, { data, error, loading }] = useLazyQuery<
    GetCompanySummaryQuery,
    GetCompanySummaryQueryVariables
  >(GET_COMPANY_SUMMARY, { fetchPolicy: 'no-cache' });
  const getCreditApplication = useGetCreditApplicationByOrderUuid(orderId);

  useEffect(() => {
    if (personUuid && companyUuid) {
      getDataSummary({
        variables: {
          uuid: companyUuid,
          personUuid,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personUuid, companyUuid]);

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  if (
    loading ||
    (!data?.companyByUuid && !data?.personByUuid) ||
    getCreditApplication.loading
  ) {
    return <Loading size="large" />;
  }

  return (
    <BusinessSummaryForm
      creditApplication={
        getCreditApplication.data?.creditApplicationByOrderUuid
      }
      person={data.personByUuid as PersonByUuid}
      company={data.companyByUuid as CompanyByUuid}
      orderId={orderId}
    />
  );
};

export default BusinessSummaryFormContainer;
