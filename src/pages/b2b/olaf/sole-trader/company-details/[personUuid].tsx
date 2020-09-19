import React from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import SoleTraderCompanyDetailsFormContainer from '../../../../../containers/SoleTraderCompanyDetailsFormContainer';
import withApollo from '../../../../../hocs/withApollo';
import OLAFLayout from '../../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams, getUrlParam } from '../../../../../utils/url';

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const SoleTraderCompanyDetailsPage: NextPage = () => {
  const router = useRouter();
  const { personUuid, orderId, companyUuid } = router.query as QueryParams;
  const isEdited = router.query.redirect === 'summary';

  const handleSubmitError = () =>
    toast.error(
      'Oops, an unexpected error occurred',
      'Your details could not be saved. Please try submitting the form again.',
      { dataTestId: 'company-details-error' },
    );

  const handleSubmitCompletion = (uuid: string) => {
    const params = getUrlParam({ orderId });
    const url = `/b2b/olaf/sole-trader/vat-details/[companyUuid]${params}`;
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
