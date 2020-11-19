import { getDataFromTree } from '@apollo/react-ssr';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { ApolloError } from '@apollo/client';
import VatDetailsFormContainer from '../../../../containers/VatDetailsFormContainer';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams } from '../../../../utils/url';
import useSoleTraderJorney from '../../../../hooks/useSoleTraderJourney';
import useGetOrderId from '../../../../hooks/useGetOrderId';

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const VatDetailsPage: NextPage = () => {
  const router = useRouter();
  const isSoleTraderJourney = useSoleTraderJorney();
  const orderId = useGetOrderId();
  const { companyUuid } = router.query as QueryParams;

  const handleSubmitError = (err: ApolloError) => {
    // eslint-disable-next-line no-console
    console.error(err);
    toast.error(
      'Oops, an unexpected error occurred',
      'Your details could not be saved. Please try submitting the form again.',
    );
  };

  const handleSubmitCompletion = () => {
    const detailsUrl = !isSoleTraderJourney
      ? `/b2b/olaf/director-details/[companyUuid]`
      : `/b2b/olaf/sole-trader/sole-trader-details/[companyUuid]`;
    const summaryUrl = !isSoleTraderJourney
      ? `/b2b/olaf/summary/[companyUuid]`
      : `/b2b/olaf/sole-trader/summary/[companyUuid]`;
    const url = router.query.redirect === 'summary' ? summaryUrl : detailsUrl;
    router.push(url, url.replace('[companyUuid]', companyUuid));
  };

  return (
    <OLAFLayout>
      <VatDetailsFormContainer
        isSoleTrader={isSoleTraderJourney}
        orderId={orderId}
        companyUuid={companyUuid}
        onCompleted={handleSubmitCompletion}
        onError={handleSubmitError}
        isEdited={router.query.redirect === 'summary'}
      />
    </OLAFLayout>
  );
};

export default withApollo(VatDetailsPage, { getDataFromTree });
