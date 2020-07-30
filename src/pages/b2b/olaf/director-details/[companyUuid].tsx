import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import DirectorDetailsFormContainer from '../../../../containers/DirectorDetailsFormContainer';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { getUrlParam, OLAFQueryParams } from '../../../../utils/url';

const handleSubmitError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
  );

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const DirectorDetailsPage: NextPage = () => {
  const router = useRouter();
  const { companyUuid, derivativeId, orderId } = router.query as QueryParams;

  const handleSubmitCompletion = () => {
    const params = getUrlParam({ derivativeId, orderId });
    const url = `/b2b/olaf/company-bank-details/[companyUuid]${params}`;
    router.push(url, url.replace('[companyUuid]', companyUuid));
  };

  return (
    <OLAFLayout>
      <DirectorDetailsFormContainer
        companyUuid={companyUuid}
        orderUuid={orderId}
        onCompleted={handleSubmitCompletion}
        onError={handleSubmitError}
      />
    </OLAFLayout>
  );
};

export default withApollo(DirectorDetailsPage, { getDataFromTree });
