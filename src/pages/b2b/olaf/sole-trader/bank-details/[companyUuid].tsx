/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import withApollo from '../../../../../hocs/withApollo';
import OLAFLayout from '../../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams, getUrlParam } from '../../../../../utils/url';

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const SoleTraderBankDetailsPage: NextPage = () => {
  const router = useRouter();
  const { orderId, personUuid, companyUuid } = router.query as QueryParams;

  const handleSubmitCompletion = () => {
    const params = getUrlParam({ orderId, personUuid });
    const url = `/b2b/olaf/sole-trader/bank-details/[companyUuid]${params}`;
    router.push(url, url.replace('[personUuid]', companyUuid));
  };

  const handleSubmitError = () =>
    toast.error(
      'Oops, an unexpected error occurred',
      'Your details could not be saved. Please try submitting the form again.',
    );

  return <OLAFLayout>...</OLAFLayout>;
};

export default withApollo(SoleTraderBankDetailsPage, {
  getDataFromTree,
});
