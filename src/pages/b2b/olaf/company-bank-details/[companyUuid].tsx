import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import { ApolloError } from '@apollo/client';
import CompanyBankDetailsFormContainer from '../../../../containers/CompanyBankDetailsFormContainer/CompanyBankDetailsFormContainer';
import { OLAFQueryParams, getUrlParam } from '../../../../utils/url';
import useSoleTraderJorney from '../../../../hooks/useSoleTraderJourney';

import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

const CompanyBankDetailsPage: NextPage = () => {
  const router = useRouter();
  const isSoleTraderJourney = useSoleTraderJorney();
  const { orderId, companyUuid, personUuid } = router.query as QueryParams;

  const handleSubmitError = (err: ApolloError) => {
    console.error(err);
    toast.error(
      'Oops, an unexpected error occurred',
      'Your details could not be saved. Please try submitting the form again.',
    );
  };

  const handleSubmitCompletion = () => {
    const params = getUrlParam({ orderId, personUuid });
    const summaryUrl = !isSoleTraderJourney
      ? `/b2b/olaf/summary/[companyUuid]${params}`
      : `/b2b/olaf/sole-trader/summary/[companyUuid]${params}`;
    const url = summaryUrl;
    // router.push(url, url.replace('[companyUuid]', companyUuid));
  };

  return (
    <OLAFLayout>
      <CompanyBankDetailsFormContainer
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
