import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import { ApolloError } from '@apollo/client';
import SoleTraderDetailsFormContainer from '../../../../../containers/SoleTraderDetailsFormContainer';
import withApollo from '../../../../../hocs/withApollo';
import OLAFLayout from '../../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams, getUrlParam } from '../../../../../utils/url';
import useGetPersonUuid from '../../../../../hooks/useGetPersonUuid';

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const SoleTraderDetailsPage: NextPage = () => {
  const router = useRouter();
  const { orderId, companyUuid } = router.query as QueryParams;
  const personUuid = useGetPersonUuid();

  const handleSubmitError = (err: ApolloError) => {
    console.error(err);
    toast.error(
      'Oops, an unexpected error occurred',
      'Your details could not be saved. Please try submitting the form again.',
    );
  };

  const handleSubmitCompletion = () => {
    const params = getUrlParam({ orderId });
    const url =
      router.query.redirect === 'summary'
        ? `/b2b/olaf/sole-trader/summary/[companyUuid]${params}`
        : `/b2b/olaf/sole-trader/bank-details/[companyUuid]${params}`;
    router.push(url, url.replace('[companyUuid]', companyUuid));
  };

  return (
    <OLAFLayout>
      <SoleTraderDetailsFormContainer
        orderId={orderId}
        personUuid={personUuid}
        companyUuid={companyUuid}
        onCompleted={handleSubmitCompletion}
        onError={handleSubmitError}
        isEdited={router.query.redirect === 'summary'}
      />
    </OLAFLayout>
  );
};

export default withApollo(SoleTraderDetailsPage, {
  getDataFromTree,
});
