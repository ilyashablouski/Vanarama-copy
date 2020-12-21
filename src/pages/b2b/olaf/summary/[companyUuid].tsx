/* eslint-disable @typescript-eslint/camelcase */
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as toast from 'core/atoms/toast/Toast';
import { useState } from 'react';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import BusinessSummaryFormContainer from '../../../../containers/BusinessSummaryFormContainer/BusinessSummaryFormContainer';
import withApollo from '../../../../hocs/withApollo';
import useGetPersonUuid from '../../../../hooks/useGetPersonUuid';
import useSoleTraderJourney from '../../../../hooks/useSoleTraderJourney';
import { GetOlafData_orderByUuid } from '../../../../../generated/GetOlafData';
import { GetDerivative_derivative } from '../../../../../generated/GetDerivative';
import { pushSummaryDataLayer } from '../../../../utils/dataLayerHelpers';
import useGetOrderId from '../../../../hooks/useGetOrderId';

type QueryParams = {
  companyUuid: string;
};

const handleSubmitError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
  );

const BusinessSummaryPage: NextPage = () => {
  const router = useRouter();
  const { companyUuid } = router.query as QueryParams;
  const orderId = useGetOrderId();
  const personUuid = useGetPersonUuid();
  const isSoleTrader = useSoleTraderJourney();
  const [
    detailsData,
    setDetailsData,
  ] = useState<GetOlafData_orderByUuid | null>(null);
  const [
    derivativeData,
    setDerivativeData,
  ] = useState<GetDerivative_derivative | null>(null);

  const handleComplete = (emailAddress: string | undefined) => {
    pushSummaryDataLayer({
      detailsData,
      derivativeData,
      orderId,
      emailAddress,
    });
    router.push(
      '/olaf/thank-you/[orderId]?isB2b=1',
      '/olaf/thank-you/[orderId]?isB2b=1'.replace('[orderId]', orderId),
    );
  };

  return (
    <OLAFLayout
      setDetailsData={setDetailsData}
      setDerivativeData={setDerivativeData}
    >
      <BusinessSummaryFormContainer
        isSoleTrader={isSoleTrader}
        onCompleted={handleComplete}
        onError={handleSubmitError}
        personUuid={personUuid}
        orderId={orderId}
        companyUuid={companyUuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(BusinessSummaryPage, { getDataFromTree });
