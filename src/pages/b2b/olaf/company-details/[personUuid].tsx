import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { getUrlParam, OLAFQueryParams } from '../../../../utils/url';
import CompanyDetailsFormContainer from '../../../../containers/CompanyDetailsFormContainer';

const handleSubmitError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
    { dataTestId: 'company-details-error' },
  );

type QueryParams = OLAFQueryParams & {
  personUuid: string;
  companyUuid: string;
};

export const CompanyDetailsPage: NextPage = () => {
  const router = useRouter();
  const { personUuid, orderId, companyUuid } = router.query as QueryParams;

  const isEdited = router.query.redirect === 'summary';
  const handleSubmitCompletion = (companyGuid: string) => {
    const params = getUrlParam({ orderId });
    const url = isEdited
      ? `/b2b/olaf/summary/[companyUuid]${params}`
      : `/b2b/olaf/vat-details/[companyUuid]${params}`;
    router.push(url, url.replace('[companyUuid]', companyGuid));
  };

  return (
    <OLAFLayout>
      <CompanyDetailsFormContainer
        companyUuid={companyUuid}
        personUuid={personUuid}
        orderId={orderId}
        onCompleted={handleSubmitCompletion}
        onError={handleSubmitError}
        isEdited={isEdited}
      />
    </OLAFLayout>
  );
};

export default withApollo(CompanyDetailsPage);
