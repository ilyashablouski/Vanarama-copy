import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import SoleTraderCompanyDetailsFormContainer from '../../../../../containers/SoleTraderCompanyDetailsFormContainer';
import withApollo from '../../../../../hocs/withApollo';
import OLAFLayout from '../../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams } from '../../../../../utils/url';
import useGetOrderId from '../../../../../hooks/useGetOrderId';
import useGetPersonUuid from '../../../../../hooks/useGetPersonUuid';

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const SoleTraderCompanyDetailsPage: NextPage = () => {
  const router = useRouter();
  const orderId = useGetOrderId();
  const personUuid = useGetPersonUuid();
  const { companyUuid } = router.query as QueryParams;
  const isEdited = router.query.redirect === 'summary';

  const handleSubmitError = () =>
    toast.error(
      'Oops, an unexpected error occurred',
      'Your details could not be saved. Please try submitting the form again.',
      { dataTestId: 'company-details-error' },
    );

  const handleSubmitCompletion = (uuid: string) => {
    const url =
      router.query.redirect === 'summary'
        ? `/b2b/olaf/sole-trader/summary/[companyUuid]`
        : `/b2b/olaf/sole-trader/vat-details/[companyUuid]`;
    router.push(url, url.replace('[companyUuid]', uuid));
  };

  return (
    <OLAFLayout>
      <SoleTraderCompanyDetailsFormContainer
        orderId={orderId}
        companyUuid={companyUuid}
        personUuid={personUuid}
        onCompleted={handleSubmitCompletion}
        onError={handleSubmitError}
        isEdited={isEdited}
      />
    </OLAFLayout>
  );
};

export default withApollo(SoleTraderCompanyDetailsPage, {
  getDataFromTree,
});
