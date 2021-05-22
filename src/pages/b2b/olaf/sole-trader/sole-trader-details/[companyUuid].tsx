import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as toast from 'core/atoms/toast/Toast';
import SoleTraderDetailsFormContainer from '../../../../../containers/SoleTraderDetailsFormContainer';
import withApollo from '../../../../../hocs/withApollo';
import OLAFLayout from '../../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams } from '../../../../../utils/url';
import useGetPersonUuid from '../../../../../hooks/useGetPersonUuid';
import useGetOrderId from '../../../../../hooks/useGetOrderId';

const handleSubmitError = () => {
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
  );
};

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const SoleTraderDetailsPage: NextPage = () => {
  const router = useRouter();
  const orderId = useGetOrderId();
  const personUuid = useGetPersonUuid();
  const { companyUuid, redirect } = router.query as QueryParams;

  const handleSubmitCompletion = () => {
    const url = redirect || `/b2b/olaf/sole-trader/bank-details/[companyUuid]`;
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
        isEdited={!!redirect}
      />
    </OLAFLayout>
  );
};

export default withApollo(SoleTraderDetailsPage, {
  getDataFromTree,
});
