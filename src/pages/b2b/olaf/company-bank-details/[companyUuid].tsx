import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import { ApolloError } from '@apollo/client';
import CompanyBankDetailsFormContainer from '../../../../containers/CompanyBankDetailsFormContainer/CompanyBankDetailsFormContainer';
import { OLAFQueryParams } from '../../../../utils/url';
import useSoleTraderJorney from '../../../../hooks/useSoleTraderJourney';

import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import useGetOrderId from '../../../../hooks/useGetOrderId';

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

const CompanyBankDetailsPage: NextPage = () => {
  const router = useRouter();
  const isSoleTraderJourney = useSoleTraderJorney();
  const orderId = useGetOrderId();
  const { companyUuid, personUuid } = router.query as QueryParams;

  const handleSubmitError = (err: ApolloError) => {
    // eslint-disable-next-line no-console
    console.error(err);
    toast.error(
      'Oops, an unexpected error occurred',
      'Your details could not be saved. Please try submitting the form again.',
    );
  };

  const handleSubmitCompletion = () => {
    const summaryUrl = !isSoleTraderJourney
      ? '/b2b/olaf/summary/[companyUuid]'
      : '/b2b/olaf/sole-trader/summary/[companyUuid]';
    const url = summaryUrl;
    router.push(url, url.replace('[companyUuid]', companyUuid));
  };

  return (
    <OLAFLayout>
      <CompanyBankDetailsFormContainer
        personUuid={personUuid}
        isSoleTrader={isSoleTraderJourney}
        isEdited={router.query.redirect === 'summary'}
        companyUuid={companyUuid}
        orderUuid={orderId}
        onCompleted={handleSubmitCompletion}
        onError={err => handleSubmitError(err)}
      />
    </OLAFLayout>
  );
};

export default withApollo(CompanyBankDetailsPage, { getDataFromTree });
