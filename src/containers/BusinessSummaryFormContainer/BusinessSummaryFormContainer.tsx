import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React, { useEffect, useState } from 'react';
import BusinessSummaryForm from '../../components/BusinessSummaryForm/BusinessSummaryForm';
import { GetCompanySummaryQuery } from '../../../generated/GetCompanySummaryQuery';
import { GET_COMPANY_SUMMARY } from './gql';
import { useImperativeQuery } from '../../hooks/useImperativeQuery';

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

  useEffect(() => {
    if (personUuid && companyUuid) {
      getDataSummary({
        uuid: companyUuid,
        personUuid,
      })
        .then(response => {
          setData(response.data);
        })
        .catch(responseError => setError(responseError.message))
    }
  }, [setData, personUuid, companyUuid, getDataSummary]);

  if (error) {
    return <p>Error occurred: {error}</p>;
  }

  if (!data || (!data.companyByUuid && !data.personByUuid)) {
    return <Loading size="large" />;
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
