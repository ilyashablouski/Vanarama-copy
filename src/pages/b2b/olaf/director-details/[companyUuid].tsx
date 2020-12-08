import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import DirectorDetailsFormContainer from '../../../../containers/DirectorDetailsFormContainer';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams } from '../../../../utils/url';
import useGetOrderId from '../../../../hooks/useGetOrderId';

const handleSubmitError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
  );

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
  directorUuid: string;
};

export const DirectorDetailsPage: NextPage = () => {
  const router = useRouter();
  const orderId = useGetOrderId();
  const { companyUuid, directorUuid, personUuid } = router.query as QueryParams;

  const handleSubmitCompletion = () => {
    const url =
      router.query.redirect === 'summary'
        ? '/b2b/olaf/summary/[companyUuid]'
        : '/b2b/olaf/company-bank-details/[companyUuid]';
    router.push(url, url.replace('[companyUuid]', companyUuid));
  };

  return (
    <OLAFLayout>
      <DirectorDetailsFormContainer
        isEdited={router.query.redirect === 'summary'}
        directorUuid={directorUuid}
        companyUuid={companyUuid}
        personUuid={personUuid}
        orderUuid={orderId}
        onCompleted={handleSubmitCompletion}
        onError={handleSubmitError}
      />
    </OLAFLayout>
  );
};

export default withApollo(DirectorDetailsPage, { getDataFromTree });
