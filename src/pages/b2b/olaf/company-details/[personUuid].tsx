import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams } from '../../../../utils/url';
import CompanyDetailsFormContainer from '../../../../containers/CompanyDetailsFormContainer';
import useGetOrderId from '../../../../hooks/useGetOrderId';

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
  const orderId = useGetOrderId();
  const { personUuid, companyUuid } = router.query as QueryParams;

  const isEdited = router.query.redirect === 'summary';
  const handleSubmitCompletion = (companyGuid: string) => {
    const url = isEdited
      ? '/b2b/olaf/summary/[companyUuid]'
      : `/b2b/olaf/vat-details/[companyUuid]?personUuid=${personUuid}`;
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
