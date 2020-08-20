import { getDataFromTree } from '@apollo/react-ssr';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import VatDetailsFormContainer from '../../../../containers/VatDetailsFormContainer';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams, getUrlParam } from '../../../../utils/url';

const handleSubmitError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
  );

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const VatDetailsPage: NextPage = () => {
  const router = useRouter();
  const { companyUuid, orderId } = router.query as QueryParams;

  const handleSubmitCompletion = () => {
    const params = getUrlParam({ orderId });
    const url =
      router.query.redirect === 'summary'
        ? `/b2b/olaf/summary/[companyUuid]${params}`
        : `/b2b/olaf/director-details/[companyUuid]${params}`;
    router.push(url, url.replace('[companyUuid]', companyUuid));
  };

  const soleTraderPathMatchResult = router.pathname.match(
    /^\/b2b\/olaf\/sole-trader\/.+/,
  );
  const isSoleTraderJourney = (soleTraderPathMatchResult || []).length > 0;

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
