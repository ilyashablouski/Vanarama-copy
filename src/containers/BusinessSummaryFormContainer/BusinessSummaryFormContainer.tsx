import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React, { useEffect, useState } from 'react';
import BusinessSummaryForm from '../../components/BusinessSummaryForm/BusinessSummaryForm';
import {
  GetCompanySummaryQuery,
  GetCompanySummaryQuery_personByUuid as PersonByUuid,
  GetCompanySummaryQuery_companyByUuid as CompanyByUuid,
} from '../../../generated/GetCompanySummaryQuery';
import { GET_COMPANY_SUMMARY } from './gql';
import { useImperativeQuery } from '../../hooks/useImperativeQuery';
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
  const [data, setData] = useState<GetCompanySummaryQuery | null>(null);
  const [error, setError] = useState('');

  const getDataSummary = useImperativeQuery(GET_COMPANY_SUMMARY);
  const getCreditApplication = useGetCreditApplicationByOrderUuid(orderId);

  useEffect(() => {
    if (personUuid && companyUuid) {
      getDataSummary({
        uuid: companyUuid,
        personUuid,
      })
        .then(response => {
          setData(response.data);
        })
        .catch(responseError => setError(responseError.message));
    }
  }, [setData, personUuid, companyUuid, getDataSummary?.refetch]);

  if (error) {
    return <p>Error occurred: {error}</p>;
  }

  if (
    !data ||
    (!data.companyByUuid && !data.personByUuid) ||
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
