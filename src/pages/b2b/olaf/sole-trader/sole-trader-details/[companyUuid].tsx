import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import { ApolloError } from '@apollo/client';
import SoleTraderDetailsFormContainer from '../../../../../containers/SoleTraderDetailsFormContainer';
import withApollo from '../../../../../hocs/withApollo';
import OLAFLayout from '../../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams } from '../../../../../utils/url';
import useGetPersonUuid from '../../../../../hooks/useGetPersonUuid';
import useGetOrderId from '../../../../../hooks/useGetOrderId';

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const SoleTraderDetailsPage: NextPage = () => {
  const router = useRouter();
  const orderId = useGetOrderId();
  const personUuid = useGetPersonUuid();
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
    const url =
      router.query.redirect === 'summary'
        ? `/b2b/olaf/sole-trader/summary/[companyUuid]`
        : `/b2b/olaf/sole-trader/bank-details/[companyUuid]`;
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
